import { Injectable } from '@nestjs/common';

const Style = `body {
                 padding: 0;
                 margin: 0;
                 box-sizing: border-box;
               }
               .main {
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 background-color: black;
                 color: white;
                 width: 100vw;
                 height: 100vh;
               }
               .title {
                 font-size: 3rem;
                 color: white;
                 font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                 text-decoration: #aaa wavy underline;
               }`;

const Welcoming = `<!DOCTYPE html>
                   <html lang="es">
                     <head>
                       <meta charset="utf-8">
                       <title>Officer Interior Design Backend</title>
                       <style>
                         ${Style}
                       </style>
                     </head>
                     <body>
                       <main class="main">
                         <h1 class="title">Welcome to Officer Interior Design's system!</h1>
                       </main>
                     </body>
                   </html>`;

@Injectable()
export class AppService {
  getHello(): string {
    return Welcoming;
  }
}
