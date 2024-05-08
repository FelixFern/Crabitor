# 🦀 Crabitor

a Rust + React Markdown Editor, this project is my first ever writing in Rust so please excuse the badly written code 😅. 

You might be wondering why don't you write the Frontend in Rust too. the main reason is that I just want to build this project quickly without thinking that much on the UI side, that's why I build it with React with Shadcn even though it might not be as performant as building it using Rust with frameworks such as Leptos. 

Why is it named "Crabitor"? because it is Crab-itor, Crab, and editor, get it? because it is written in Rust with a Crab icon. Yes, I'm very creative.

This project is started on April 17th, 2024, and is worked on in my spare time 



<div style={{ text-align:"center", display:"flex", flex-direction: "col" align-items:"center"}}>
  <img width="1710" alt="image" src="https://github.com/FelixFern/Crabitor/assets/28957554/68f55ddc-bc7c-46c8-96d5-24feaafdbfab">
  <div style={{ display: "flex" flex-direction: "row", justify-content: "center"}}>
    <img width="500px" style={{flex-grow: 1}} alt="image" src="https://github.com/FelixFern/Crabitor/assets/28957554/b7590fc6-f4b1-47ae-a593-983d621f17ec">
    <img width="500px" style={{flex-grow: 1}} alt="image" src="https://github.com/FelixFern/Crabitor/assets/28957554/3f77d4bc-6c99-476d-a311-4aa219954087">
    
  </div>
</div>

## 🗒️ Prerequisites
- Node.js version 18 and up with package manage (npm, pnpm, yarn, or bun)
- Rust with Cargo

## Tech Stack
- Rust
- Typescript
- React.js
- Tauri
- [Shadcn](https://ui.shadcn.com/) - Component Library
- [Recoil](https://recoiljs.org/) - Client Side State Library
- [Tiptap](https://tiptap.dev) - WYSIWYG Editor

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

## 🟢 Current Feature 
- Live File Save ✅
- Create New Note ✅
- Update Note Name ✅
- Edit Note ✅
- Switch Between File with Hotkeys (cmd + [number]) ✅
- Markdown Support ✅
- Quick Command (cmd + shift + p) ✅
- Delete Note (Still Buggy) 🟧

## 🟠 Todos
- Folder
- Expandable Sidebar

## 🙎‍♂️ Maintained by 
- @Felix Fernando | [Github](https://github.com/FelixFern) | [LinkedIn](https://www.linkedin.com/in/felix-fern/)
