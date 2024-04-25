use chrono::Local;
use serde_json::to_string;
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

    println!("{}", file_path);
    let file = File::create(file_path);

    let content: Note = Note {
        created_on: Local::now().to_string(),
        last_updated: Local::now().to_string(),
        note: "".to_string(),
    };

    if let Ok(mut file) = file {
        let json_content = serde_json::to_string(&content);

        if let Ok(json_content) = json_content {
            let _ = file.write_all(json_content.as_bytes());
        }
    }
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
    let curr_route: Result<Vec<FileStruct>, String> = get_file_list();

    if let Ok(curr_files) = &curr_route {
        for file in curr_files {
            if file.route == new_route {
                return Err("Duplicate File Name Found".into());
            }
        }
    } else {
        return Err("Error getting current file list".into());
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
    let file = File::open(&filepath);
    println!("{:?} {:?}", note, filepath);

    if let Ok(mut file) = file {
        let mut content = String::new();

        let _ = file.read_to_string(&mut content);

        let content_struct: Result<Note, serde_json::Error> = serde_json::from_str(&content);

        drop(file);

        if let Ok(mut content_struct) = content_struct {
            content_struct.note = note;
            content_struct.last_updated = Local::now().to_string();

            let update_content: Result<String, serde_json::Error> =
                serde_json::to_string(&content_struct);

            if let Ok(update_content) = update_content {
                let file = OpenOptions::new().write(true).truncate(true).open(filepath);

                if let Ok(mut file) = file {
                    let _ = (file).write_all(update_content.as_bytes());
                }
            }

            Ok(content_struct)
        } else {
            Err("Failed to update note".to_string())
        }
    } else {
        Err("Failed to open note".to_string())
    }
}

#[tauri::command]
pub fn read_note(filepath: String) -> Result<Note, String> {
    let file = File::open(filepath);

    if let Ok(mut file) = file {
        let mut content = String::new();

        let _ = file.read_to_string(&mut content);

        let content_struct: Result<Note, serde_json::Error> = serde_json::from_str(&content);

        if let Ok(content_struct) = content_struct {
            let update_content: Result<String, serde_json::Error> =
                serde_json::to_string(&content_struct);

            if let Ok(update_content) = update_content {
                let _ = file.write_all(update_content.as_bytes());
            }

            Ok(content_struct)
        } else {
            Err("Failed to read data".to_string())
        }
    } else {
        Err("Failed to open note".to_string())
    }
}
