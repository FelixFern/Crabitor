# Crabitor

a Rust + React Text Editor (soon to be a Markdown Editor), this project is my first ever writing in Rust so please excuse the bad written code 😅. 

You might be wondering why don't you write the Frontend in Rust too? the main reason is that I just want to build this project quickly without thinking that much on the UI side, that's why I build it with React with Shadcn even though it might not be as performant as building it using Rust with framework such as Leptos. 

This project is started on April 17th, 2024 and is worked on in my spare time 


<div style={{ text-align:"center"}}>
  <img src="https://github.com/FelixFern/Crabitor/assets/28957554/1da01a44-6631-46b5-88b4-c375b60effca" width="680px"/>
  
</div>

## Current Feature 
- Live File Save
- Create New Note
- Edit Note

## Todos
- Delete Note
- Quick Command (cmd + shift + p)
- Folder
- Expandable Sidebar

## Tech Stack
- Rust
- Typescript
- React.js
- Tauri
- Shadcn
- Recoil

## Pre-Requisite
- Node.js version 18 and up with package manage (npm, pnpm, yarn, or bun)
- Rust with Cargo

## How to Run ?
1. Git clone this repository with
   ```
   git clone https://github.com/FelixFern/Crabitor
   ```
2. Install all the needed dependencies with
   ```
   pnpm i
   ```
3. Run the project and enjoy
   ```
   pnpm tauri dev
   ```
