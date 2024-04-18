// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file;

fn main() {
    use file::create_file;
    use file::get_file_list;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_file, get_file_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
