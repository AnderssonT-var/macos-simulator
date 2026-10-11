import { useEffect, useState } from "react";
import "./NotesApp.css";

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Nueva nota",
      content: "",
      date: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
  };

  const selectedNote = notes.find(n => n.id === selectedId);

  const updateNote = (field, value) => {
    setNotes(notes.map(n =>
      n.id === selectedId ? { ...n, [field]: value } : n
    ));
  };

  return (
    <div className="notesApp">
      {/* SIDEBAR */}
      <aside className="notesSidebar">
        <div className="notesSidebarHeader">
          <span>Notas</span>
          <button onClick={createNote}>＋</button>
        </div>

        <div className="notesSection">Hoy</div>
        <div className="notesSection">Últimos 7 días</div>
        <div className="notesSection">Últimos 30 días</div>

        <div className="notesList">
          {notes.map(note => (
            <div
              key={note.id}
              className={`notesItem ${note.id === selectedId ? "active" : ""}`}
              onClick={() => setSelectedId(note.id)}
            >
              <strong>{note.title}</strong>
              <span>{new Date(note.date).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* EDITOR */}
      <main className="notesEditor">
        {selectedNote ? (
          <>
            <input
              className="notesTitle"
              value={selectedNote.title}
              onChange={e => updateNote("title", e.target.value)}
            />

            <textarea
              className="notesContent"
              value={selectedNote.content}
              onChange={e => updateNote("content", e.target.value)}
              placeholder="Escribe tu nota aquí..."
            />
          </>
        ) : (
          <div className="notesEmpty">
            Selecciona o crea una nota
          </div>
        )}
      </main>
    </div>
  );
}