import "./Desktop.css";
import { useEffect, useRef, useState } from "react";

/* UI */
import MenuBar from "../MenuBar/MenuBar.jsx";
import Dock from "../Dock/Dock.jsx";
import Window from "../Window/Window";

/* Apps */
import TerminalApp from "../apps/TerminalApp";
import MessagesApp from "../apps/MessagesApp";
import MusicApp from "../apps/MusicApp";
import SettingsWindow from "../SettingsWindow/SettingsWindow";
import SocialsApp from "../apps/SocialsApp";
import DirectoryApp from "../apps/DirectoryApp";
import FolderApp from "../apps/FolderApp";
import CalendarApp from "../apps/CalendarApp";
import PvZApp from "../apps/PvZApp";
import PhotosApp from "../apps/PhotosApp";
import NotesApp from "../apps/NotesApp";
import MemoriasApp from "../apps/MemoriasApp";
import ServiciosApp from "../apps/ServiciosApp";
import MapasApp from "../apps/MapasApp";

/* desktop icon */
import DesktopIcon from "./DesktopIcon";
import folderIcon from "../../assets/icons/folder.webp/folder.png";
import socialsIcon from "../../assets/icons/socials/socials.png";
import directoryIcon from "../../assets/icons/socials/directorio.png";
import pvzIcon from "../../assets/icons/pvz/pvz.webp";

/* widget */
import PhotoWidget from "../widgets/PhotoWidget";

export default function Desktop() {

  const stageRef = useRef(null);

  /* Wallpaper */

  const [wallpaper, setWallpaper] = useState("uploads/wallpapers/0001.webp");

  useEffect(() => {
    const loadCurrentWallpaper = async () => {
      try {
        const res = await fetch("/api/wallpapers/list.php");
        const data = await res.json();
        const current = data.find((w) => w.is_current == 1);
        if (current) {
          setWallpaper(`uploads/wallpapers/${current.filename}`);
        }
      } catch (err) {
        console.error("Error cargando fondo:", err);
      }
    };

    loadCurrentWallpaper();
  }, []);

  const handleWallpaperChange = (src) => {
    if (!src) return;
    setWallpaper(src);
  };

  /* APP STATES */

  const [terminal, setTerminal] = useState({ open:false, minimized:false });
  const [music, setMusic] = useState({ open:false, minimized:false });
  const [settings, setSettings] = useState({ open:false, minimized:false });
  const [folder, setFolder] = useState({ open:false, minimized:false });
  const [socials, setSocials] = useState({ open:false, minimized:false });
  const [directory, setDirectory] = useState({ open:false, minimized:false });
  const [calendar, setCalendar] = useState({ open:false, minimized:false });
  const [pvz, setPvz] = useState({ open:false, minimized:false });
  const [photos, setPhotos] = useState({ open:false, minimized:false });
  const [notes, setNotes] = useState({ open:false, minimized:false });
  const [message, setMessage] = useState({ open:false, minimized:false });
  const [trash, setTrash] = useState({ open:false, minimized:false });
  const [appstore, setAppstore] = useState({ open:false, minimized:false });
  const [maps, setMaps] = useState({ open:false, minimized:false });

  /* Z INDEX */

  const [activeAppId, setActiveAppId] = useState(null);

  const [zMap, setZMap] = useState({
    terminal:1,
    music:2,
    settings:3,
    folder:4,
    socials:5,
    directory:6,
    calendar:7,
    pvz:8,
    photos:9,
    notes:10,
    message:11,
    trash:12,
    appstore:13,
    maps:14
  });

  const zSeedRef = useRef(20);

  const focusApp = (id)=>{
    setActiveAppId(id);
    setZMap(prev=>({...prev,[id]:zSeedRef.current++}));
  };

  const handlers = (setter,id)=>({
    open:()=>{
      setter({open:true,minimized:false});
      focusApp(id);
    },
    close:()=>setter({open:false,minimized:false}),
    minimize:()=>setter(p=>p.open ? {...p,minimized:true}:p)
  });

  const terminalH = handlers(setTerminal,"terminal");
  const musicH = handlers(setMusic,"music");
  const settingsH = handlers(setSettings,"settings");
  const folderH = handlers(setFolder,"folder");
  const socialsH = handlers(setSocials,"socials");
  const directoryH = handlers(setDirectory,"directory");
  const calendarH = handlers(setCalendar,"calendar");
  const pvzH = handlers(setPvz,"pvz");
  const photosH = handlers(setPhotos,"photos");
  const notesH = handlers(setNotes,"notes");
  const messageH = handlers(setMessage,"message");
  const trashH = handlers(setTrash,"trash");
  const appstoreH = handlers(setAppstore,"appstore");
  const mapsH = handlers(setMaps,"maps");

  /* DOCK CLICK */

  const handleDockClick = (appId)=>{

    const map={
      terminal:[terminal,setTerminal],
      music:[music,setMusic],
      settings:[settings,setSettings],
      folder:[folder,setFolder],
      socials:[socials,setSocials],
      directory:[directory,setDirectory],
      calendar:[calendar,setCalendar],
      pvz:[pvz,setPvz],
      photos:[photos,setPhotos],
      notes:[notes,setNotes],
      message:[message,setMessage],
      trash:[trash,setTrash],
      appstore:[appstore,setAppstore],
      maps:[maps,setMaps]
    };

    const entry = map[appId];
    if(!entry) return;

    const [state,setter] = entry;

    if(state.open && state.minimized){
      setter({open:true,minimized:false});
      focusApp(appId);
      return;
    }

    if(state.open && !state.minimized){
      focusApp(appId);
      return;
    }

    setter({open:true,minimized:false});
    focusApp(appId);

  };

  /* FINDER -> CLOSE ALL */

  const closeAllApps = ()=>{

    setTerminal({open:false,minimized:false});
    setMusic({open:false,minimized:false});
    setSettings({open:false,minimized:false});
    setFolder({open:false,minimized:false});
    setSocials({open:false,minimized:false});
    setDirectory({open:false,minimized:false});
    setCalendar({open:false,minimized:false});
    setPvz({open:false,minimized:false});
    setPhotos({open:false,minimized:false});
    setNotes({open:false,minimized:false});
    setMessage({open:false,minimized:false});
    setTrash({open:false,minimized:false});
    setAppstore({open:false,minimized:false});
    setMaps({open:false,minimized:false});

    setActiveAppId(null);

  };

  return (

    <main className="desktop" style={{backgroundImage:`url(/${wallpaper})`}}>

      <MenuBar onOpenCalendar={()=>calendarH.open()} />

      <div
        className="desktop__stage"
        ref={stageRef}
        onMouseDown={()=>setActiveAppId(null)}
      >

        <PhotoWidget />

        {/* ICONOS */}

        <div className="desktopIcons">

          <DesktopIcon
            icon={folderIcon}
            label="Información"
            onOpen={folderH.open}
            defaultPosition={{ x: 1400, y: 120 }}
          />

          <DesktopIcon
            icon={socialsIcon}
            label="Redes"
            onOpen={socialsH.open}
            defaultPosition={{ x: 1400, y: 200 }}
          />

          <DesktopIcon
            icon={directoryIcon}
            label="Contactos"
            onOpen={directoryH.open}
            defaultPosition={{ x: 1400, y: 280 }}
          />

          <DesktopIcon
            icon={pvzIcon}
            label="Juegos"
            onOpen={pvzH.open}
            defaultPosition={{ x: 1400, y: 360 }}
          />

        </div>

        {/* WINDOWS */}

        <div className="desktop__windows">

          {music.open && (
            <Window title="Música" stageRef={stageRef} minimized={music.minimized} onClose={musicH.close} onMinimize={musicH.minimize} isActive={activeAppId==="music"} zIndex={zMap.music} onFocus={()=>focusApp("music")}>
              <MusicApp/>
            </Window>
          )}

          {message.open && (
            <Window title="Comunidad" stageRef={stageRef} minimized={message.minimized} onClose={messageH.close} onMinimize={messageH.minimize} isActive={activeAppId==="message"} zIndex={zMap.message} onFocus={()=>focusApp("message")}>
              <MessagesApp/>
            </Window>
          )}

          {terminal.open && (
            <Window title="Tras Cámaras" stageRef={stageRef} minimized={terminal.minimized} onClose={terminalH.close} onMinimize={terminalH.minimize} isActive={activeAppId==="terminal"} zIndex={zMap.terminal} onFocus={()=>focusApp("terminal")}>
              <TerminalApp/>
            </Window>
          )}

          {trash.open && (
            <Window title="Memorias Institucionales" stageRef={stageRef} minimized={trash.minimized} onClose={trashH.close} onMinimize={trashH.minimize} isActive={activeAppId==="trash"} zIndex={zMap.trash} onFocus={()=>focusApp("trash")}>
              <MemoriasApp/>
            </Window>
          )}

          {appstore.open && (
            <Window title="Servicios / Producción" stageRef={stageRef} minimized={appstore.minimized} onClose={appstoreH.close} onMinimize={appstoreH.minimize} isActive={activeAppId==="appstore"} zIndex={zMap.appstore} onFocus={()=>focusApp("appstore")}>
              <ServiciosApp/>
            </Window>
          )}

          {maps.open && (
            <Window title="Contacto / Ubicación" stageRef={stageRef} minimized={maps.minimized} onClose={mapsH.close} onMinimize={mapsH.minimize} isActive={activeAppId==="maps"} zIndex={zMap.maps} onFocus={()=>focusApp("maps")}>
              <MapasApp/>
            </Window>
          )}

          {settings.open && (
            <Window title="Configuración" stageRef={stageRef} width={1100} height={750} forceSize minimized={settings.minimized} onClose={settingsH.close} onMinimize={settingsH.minimize} isActive={activeAppId==="settings"} zIndex={zMap.settings} onFocus={()=>focusApp("settings")}>
              <SettingsWindow onSelectWallpaper={handleWallpaperChange} currentWallpaper={wallpaper}/>
            </Window>
          )}

          {folder.open && (
            <Window title="Información" stageRef={stageRef} minimized={folder.minimized} onClose={folderH.close} onMinimize={folderH.minimize} isActive={activeAppId==="folder"} zIndex={zMap.folder} onFocus={()=>focusApp("folder")}>
              <FolderApp/>
            </Window>
          )}

          {socials.open && (
            <Window title="Redes Sociales" stageRef={stageRef} minimized={socials.minimized} onClose={socialsH.close} onMinimize={socialsH.minimize} isActive={activeAppId==="socials"} zIndex={zMap.socials} onFocus={()=>focusApp("socials")}>
              <SocialsApp/>
            </Window>
          )}

          {directory.open && (
            <Window title="Contactos" stageRef={stageRef} minimized={directory.minimized} onClose={directoryH.close} onMinimize={directoryH.minimize} isActive={activeAppId==="directory"} zIndex={zMap.directory} onFocus={()=>focusApp("directory")}>
              <DirectoryApp/>
            </Window>
          )}

          {calendar.open && (
            <Window title="Calendario" stageRef={stageRef} minimized={calendar.minimized} onClose={calendarH.close} onMinimize={calendarH.minimize} isActive={activeAppId==="calendar"} zIndex={zMap.calendar} onFocus={()=>focusApp("calendar")}>
              <CalendarApp/>
            </Window>
          )}

          {photos.open && (
            <Window title="Fotos" stageRef={stageRef} minimized={photos.minimized} onClose={photosH.close} onMinimize={photosH.minimize} isActive={activeAppId==="photos"} zIndex={zMap.photos} onFocus={()=>focusApp("photos")}>
              <PhotosApp/>
            </Window>
          )}

          {pvz.open && (
            <Window title="Plants vs Zombies" stageRef={stageRef} minimized={pvz.minimized} onClose={pvzH.close} onMinimize={pvzH.minimize} isActive={activeAppId==="pvz"} zIndex={zMap.pvz} onFocus={()=>focusApp("pvz")}>
              <PvZApp/>
            </Window>
          )}

          {notes.open && (
            <Window title="Notas" stageRef={stageRef} minimized={notes.minimized} onClose={notesH.close} onMinimize={notesH.minimize} isActive={activeAppId==="notes"} zIndex={zMap.notes} onFocus={()=>focusApp("notes")}>
              <NotesApp/>
            </Window>
          )}

        </div>

      </div>

      <Dock
        onItemClick={handleDockClick}
        onFinderClick={closeAllApps}
        appState={{
          terminal,
          music,
          settings,
          folder,
          socials,
          directory,
          calendar,
          pvz,
          photos,
          notes,
          message,
          trash,
          appstore,
          maps
        }}
      />

    </main>

  );

}