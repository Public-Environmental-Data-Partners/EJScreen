# Installation
This document describes how to get EJScreen running locally on your own computer.

There are probably many ways to do this. Here's one that works:

- EJScreen is built using the ASP.NET 4.8 framework. That requires a Windows machine.
- Pull this repo using your preferred method (e.g. Github Desktop, `git`). If you're not working on an established branch, it's advisable to create one (see EDGI's contributing guidelines [here](https://github.com/edgi-govdata-archiving/overview/blob/main/CONTRIBUTING.md)). A branch is a way to develop and test code without overwriting the "official" main version of the code. Eventually, edits on your branch can be merged or "pulled" into the main branch using a "pull request."
- In terms of editing the code, Visual Studio Code integrates well with Github and ASP.NET 4.8. 
- Download and open VS Code. ASP.NET 4.8 sites require an IIS server. Maybe the easiest way to work with it is to install the "[IIS Express[(https://github.com/warrenbuckley/IIS-Express-Code)" extension to VS Code, enabling you to start/stop/restart the server from within the editor. In the "Extensions" menu of VS Code (Ctrl-Shift-X), search for "IIS Express" and install it.
- You can run IIS Express by doing Ctrl-Shift-P to access the VS Code commands. Then search for IIS Express: Start Website.
- A browser should open at the path `localhost:4922` and you should see the EJScreen website.


- If you're on a Mac, you can spin up a local host by typing this in your VS Code terminal `python3 -m http.server 4922`