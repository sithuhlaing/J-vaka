import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";

interface FormElement {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface Row {
  id: string;
  elements: FormElement[];
}

interface Selection {
  r: number;
  i: number;
}

declare global {
  interface Element {
    _sortable?: any;
  }
}

export default function FormBuilder(){
  const libRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [rows,setRows] = useState<Row[]>([]); // each row: {id, elements: [{type,label,required,options}]}
  const [selected,setSelected] = useState<Selection | null>(null); // {r,i}
  const [jsonText,setJsonText] = useState("");
  const idRef = useRef(1);

  useEffect(()=>{
    if(!libRef.current||!canvasRef.current) return;
    Sortable.create(libRef.current,{
      group:{name:'shared', pull:'clone', put:false}, sort:false,
      animation:150,
      onStart:()=>canvasRef.current?.classList.add('ring'),
      onEnd:()=>canvasRef.current?.classList.remove('ring')
    });

    const canvasSort = Sortable.create(canvasRef.current,{
      group:'shared', animation:150,
      onAdd: (evt: any)=>{
        const type = evt.item.dataset.type;
        if(type==='layout-row') addRow();
        evt.item.remove();
      }
    });

    return ()=>{ canvasSort.destroy(); };
  },[]);

  useEffect(()=>{
    // init sortables on rows so they accept components
    const els = document.querySelectorAll('[data-row-id]');
    els.forEach(el=>{
      const htmlEl = el as HTMLElement;
      if(htmlEl._sortable) return;
      htmlEl._sortable = Sortable.create(htmlEl,{
        group:'shared', animation:120,
        onAdd: (evt: any)=>{
          const type = evt.item.dataset.type;
          const rowId = htmlEl.dataset.rowId;
          addElementToRow(rowId!, type);
          evt.item.remove();
        }
      });
    });
    return ()=>{ els.forEach(el=>{ const htmlEl = el as HTMLElement; if(htmlEl._sortable){ htmlEl._sortable.destroy(); htmlEl._sortable=null;} }); };
  },[rows]);

  function addRow(){
    const id = 'r'+(idRef.current++);
    setRows(r=>[...r,{id, elements: []}]);
  }
  function addElementToRow(rowId: string, type: string){
    setRows(r=>r.map(row=> row.id===rowId ? {...row, elements:[...row.elements, makeElement(type)]} : row));
  }
  function makeElement(type: string): FormElement {
    const base: Partial<FormElement> = {type, label: (type==='text'? 'Short Text' : type.charAt(0).toUpperCase()+type.slice(1)), required:false };
    if(['select','radio','checkbox'].includes(type)) base.options=['Option 1','Option 2'];
    return {...base, id:'e'+(idRef.current++)} as FormElement;
  }

  function selectEl(rIdx: number, eIdx: number){ setSelected({r:rIdx,i:eIdx}); }
  function updateSelected(ch: Partial<FormElement>){ setRows(rs=>rs.map((row,ri)=>({
    ...row,
    elements: row.elements.map((el,ei)=> (selected && ri===selected.r && ei===selected.i) ? {...el,...ch} : el)
  }))); }

  function deleteSelected(){ if(!selected) return; setRows(rs=>rs.map((row,ri)=>({ ...row, elements: row.elements.filter((_,ei)=>!(ri===selected.r&&ei===selected.i)) })).filter(r=>true)); setSelected(null); }

  function saveJSON(){ setJsonText(JSON.stringify(rows,null,2)); alert('Saved to JSON textarea'); }
  function loadJSON(){ try{ const data = JSON.parse(jsonText); if(!Array.isArray(data)) throw 0; setRows(data); setSelected(null);}catch(e){alert('Invalid JSON');} }

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gray-100">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl">React Form Builder</h1>
        <div>
          <button onClick={saveJSON} className="px-3 py-1 bg-blue-600 text-white rounded mr-2">Save JSON</button>
          <button onClick={loadJSON} className="px-3 py-1 bg-gray-700 text-white rounded">Load JSON</button>
        </div>
      </header>
      <div className="flex gap-4 flex-1">
        <aside className="w-64 bg-white p-3 rounded shadow" ref={libRef}>
          <h3 className="font-medium mb-2">Library</h3>
          <div className="space-y-2">
            <div className="p-2 border rounded bg-green-50" data-type="layout-row">New Row</div>
            {['text','textarea','select','radio','checkbox','date','signature'].map(t=> (
              <div key={t} className="p-2 border rounded bg-gray-50" data-type={t}>{t}</div>
            ))}
          </div>
        </aside>

        <main className="flex-1">
          <h2 className="text-center mb-2">Form Canvas</h2>
          <div ref={canvasRef} id="canvas" className="min-h-[300px] p-4 border-2 border-dashed rounded bg-white" style={{transition:'box-shadow .15s'}}>
            {rows.length===0 && <p className="text-center text-gray-500">Drag a "New Row" here to start</p>}
            {rows.map((row,ri)=> (
              <div key={row.id} data-row-id={row.id} className="mb-3 p-3 border rounded bg-blue-50">
                <div className="flex gap-3">
                  {row.elements.length===0 && <div className="text-gray-500 w-full text-center">Drop components here</div>}
                  {row.elements.map((el,ei)=> (
                    <div key={el.id} className={`p-3 bg-white border ${selected&&selected.r===ri&&selected.i===ei? 'ring ring-blue-400':''}`} onClick={()=>selectEl(ri,ei)}>
                      <div className="font-semibold">{el.label}{el.required? ' *':''}</div>
                      <div className="text-sm text-gray-500">{el.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="w-80 bg-white p-3 rounded shadow flex flex-col">
          <h3 className="font-medium">Properties</h3>
          {!selected && <div className="text-gray-500 mt-3">Select an element</div>}
          {selected && (
            (()=>{
              const el = rows[selected.r].elements[selected.i];
              return (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-sm">Label</label>
                    <input className="w-full border p-1" defaultValue={el.label} onBlur={e=>updateSelected({label:e.target.value})} />
                  </div>
                  <div>
                    <label className="inline-flex items-center gap-2"><input type="checkbox" defaultChecked={el.required} onChange={e=>updateSelected({required:e.target.checked})}/> Required</label>
                  </div>
                  {['select','radio','checkbox'].includes(el.type) && (
                    <div>
                      <label className="block text-sm">Options (one per line)</label>
                      <textarea className="w-full border p-1" defaultValue={el.options?.join('\n') || ''} onBlur={e=>updateSelected({options: e.target.value.split('\n').filter(s=>s)})} />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={deleteSelected} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </div>
              );
            })()
          )}

          <div className="mt-auto pt-3">
            <h4 className="font-medium">JSON</h4>
            <textarea className="w-full h-40 border p-2 mt-2" value={jsonText} onChange={e=>setJsonText(e.target.value)} />
          </div>
        </aside>
      </div>
    </div>
  );
}
