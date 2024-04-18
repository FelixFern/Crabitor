use serde::{Deserialize, Serialize};
use std::fs::File;

#[derive(Debug, Serialize, Deserialize)]
pub struct FileStruct {
    route: String,
}

#[tauri::command]
pub fn create_file(filename: String) {
    let file_path = format!("./data/{}.json", filename);

    println!("{}", file_path);
    let _ = File::create(file_path);
}

#[tauri::command]
pub fn get_file_list() -> Result<Vec<FileStruct>, String> {
    let mut list: Vec<FileStruct> = Vec::new();

    let paths =
        std::fs::read_dir("./data").map_err(|e| format!("Error reading directory: {}", e))?;
    for path in paths {
        if let Ok(entry) = path {
            let route = entry.path().to_str().unwrap_or("").to_string();
            list.push(FileStruct { route });
        }
    }

    Ok(list)
}
