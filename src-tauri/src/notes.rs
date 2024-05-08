use chrono::Local;
use core::panic;
use serde::{Deserialize, Serialize};
use std::{
    fs::{self, File, OpenOptions},
    io::{self, Read, Write},
};

#[derive(Debug, Serialize, Deserialize)]
pub struct FileStruct {
    route: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Note {
    created_on: String,
    last_updated: String,
    note: String,
}

#[tauri::command]
pub fn create_file(filename: String) -> Result<String, String> {
    let file_path = format!("./data/{}.json", filename);

    let mut file =
        File::create(file_path).unwrap_or_else(|e| panic!("Failed to create file: {}", e));

    let content: Note = Note {
        created_on: Local::now().to_string(),
        last_updated: Local::now().to_string(),
        note: "".to_string(),
    };

    let json_content = serde_json::to_string(&content)
        .unwrap_or_else(|e| panic!("Failed to convert data to json: {}", e));

    let _ = file.write_all(json_content.as_bytes());

    Ok("File created successfully".to_string())
}

#[tauri::command]
pub fn get_file_list() -> Result<Vec<FileStruct>, String> {
    let mut list: Vec<FileStruct> = Vec::new();

    let paths: fs::ReadDir =
        std::fs::read_dir("./data").map_err(|e| format!("Error reading directory: {}", e))?;

    for path in paths {
        if let Ok(entry) = path {
            let route = entry.path().to_str().unwrap_or("").to_string();
            list.push(FileStruct { route });
        }
    }

    Ok(list)
}

#[tauri::command]
pub fn rename_file(prev_route: String, new_route: String) -> Result<String, String> {
    println!("{} {}", prev_route, new_route);
    let curr_route =
        get_file_list().unwrap_or_else(|e| panic!("Error getting current file list {}", e));

    for file in curr_route {
        if file.route == new_route {
            return Err("Duplicate File Name Found".into());
        }
    }

    if let Err(err) = fs::rename(&prev_route, &new_route) {
        match err.kind() {
            io::ErrorKind::NotFound => return Err("File not found".into()),
            io::ErrorKind::PermissionDenied => return Err("Permission denied".into()),
            _ => return Err("Error renaming file".into()),
        }
    }
    Ok("Rename Successful".into())
}

#[tauri::command]
pub fn update_note(note: String, filepath: String) -> Result<Note, String> {
    let mut file = File::open(&filepath).unwrap_or_else(|e| panic!("Failed to read note: {}", e));

    let mut content = String::new();

    let _ = file.read_to_string(&mut content);

    let mut content_struct: Note =
        serde_json::from_str(&content).unwrap_or_else(|e| panic!("Failed to update note: {}", e));

    drop(file);

    content_struct.note = note;
    content_struct.last_updated = Local::now().to_string();

    let update_content = serde_json::to_string(&content_struct)
        .unwrap_or_else(|e| panic!("Failed to update note: {}", e));

    let mut file = OpenOptions::new()
        .write(true)
        .truncate(true)
        .open(filepath)
        .unwrap_or_else(|e| panic!("Failed to read note: {}", e));

    let _ = file.write_all(update_content.as_bytes());

    Ok(content_struct)
}

#[tauri::command]
pub fn read_note(filepath: String) -> Result<Note, String> {
    let file = File::open(filepath);

    if let Ok(mut file) = file {
        let mut content = String::new();

        let _ = file.read_to_string(&mut content);

        let content_struct =
            serde_json::from_str(&content).unwrap_or_else(|e| panic!("Failed to read data: {}", e));

        let update_content = serde_json::to_string(&content_struct)
            .unwrap_or_else(|e| panic!("Failed to open note: {}", e));

        let _ = file.write_all(update_content.as_bytes());

        Ok(content_struct)
    } else {
        Err("Failed to read note".to_string())
    }
}

#[tauri::command]
pub fn delete_note(filepath: String) -> Result<String, String> {
    println!("{}", filepath);
    match fs::remove_file(filepath) {
        Ok(_) => Ok("File deleted successfully".to_string()),
        Err(e) => Err(e.to_string()),
    }
}
