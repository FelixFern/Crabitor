use std::fs::{self, File};

struct FileStruct {
    route: String,
}

#[tauri::command]
pub fn create_file(filename: String) {
    let file_path = format!("./data/{}.json", filename);

    println!("{}", file_path);
    let _ = File::create(file_path);
}
#[tauri::command]
pub fn get_file_list() -> Vec<FileStruct> {
    let mut list: Vec<FileStruct> = Vec::new();

    let paths = fs::read_dir("./data/").unwrap();
    for path in paths {
        if let Ok(entry) = path {
            let route = entry.path();
            let route_str = route.to_str().unwrap_or("").to_string();
            list.push(FileStruct { route: route_str });
        }
    }
    list
}
