#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use is_wsl::is_wsl;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn is_wsl_tauri() -> bool {
    return is_wsl();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, is_wsl_tauri])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
