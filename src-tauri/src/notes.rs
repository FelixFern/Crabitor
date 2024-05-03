use chrono::Local;
use core::panic;
use std::{
    fs::{self, File, OpenOptions},
    io::{self, Read, Write},
};

use serde::{Deserialize, Serialize};

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
pub fn create_file(filename: String) {
    let file_path = format!("./data/{}.json", filename);

    let mut file = match File::create(file_path) {
        Ok(v) => v,
        Err(_) => panic!("Failed to create file"),
    };

    let content: Note = Note {
        created_on: Local::now().to_string(),
        last_updated: Local::now().to_string(),
        note: "".to_string(),
    };

    let json_content = match serde_json::to_string(&content) {
        Ok(v) => v,
        Err(_) => panic!("Failed to convert data to json"),
    };

    let _ = file.write_all(json_content.as_bytes());
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
    let curr_route = match get_file_list() {
        Ok(v) => v,
        Err(_) => panic!("Error getting current file list"),
    };

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
    let mut file = match File::open(&filepath) {
        Ok(v) => v,
        Err(_) => panic!("Failed to open note"),
    };

    let mut content = String::new();

    let _ = file.read_to_string(&mut content);

    let mut content_struct: Note = match serde_json::from_str(&content) {
        Ok(v) => v,
        Err(_) => panic!("Failed to update note"),
    };

    drop(file);

    content_struct.note = note;
    content_struct.last_updated = Local::now().to_string();

    let update_content = match serde_json::to_string(&content_struct) {
        Ok(v) => v,
        Err(_) => panic!("Failed to update note"),
    };

    let file = OpenOptions::new().write(true).truncate(true).open(filepath);

    if let Ok(mut file) = file {
        let _ = (file).write_all(update_content.as_bytes());
    }

    Ok(content_struct)
}

#[tauri::command]
pub fn read_note(filepath: String) -> Result<Note, String> {
    let mut file = match File::open(filepath) {
        Ok(v) => v,
        Err(_) => panic!("Failed to open note"),
    };

    let mut content = String::new();

    let _ = file.read_to_string(&mut content);

    let content_struct = match serde_json::from_str(&content) {
        Ok(v) => v,
        Err(_) => panic!("Failed to read data"),
    };

    let update_content = match serde_json::to_string(&content_struct) {
        Ok(v) => v,
        Err(_) => panic!("Failed to read data"),
    };

    let _ = file.write_all(update_content.as_bytes());

    Ok(content_struct)
}
