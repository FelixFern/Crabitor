// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod notes;

fn main() {
    use notes::create_file;
    use notes::delete_note;
    use notes::get_file_list;
    use notes::read_note;
    use notes::rename_file;
    use notes::update_note;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            create_file,
            update_note,
            read_note,
            get_file_list,
            rename_file,
            delete_note,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
