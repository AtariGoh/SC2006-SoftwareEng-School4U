# SC2006-SoftwareEng-Right School For Your Kid
- Website aimed to distill the process of finding the right school for youths

[!NOTE]
> Useful information for team references
**Documentations**  
- [SC2006 idea docs](https://docs.google.com/document/d/1Fj-vPyJnf7ix3onUE3jTrdtBB-NYlnRz9uBgXQvdWAE/edit?usp=sharing)
- [SRS 2006](https://entuedu-my.sharepoint.com/:w:/r/personal/ykang008_e_ntu_edu_sg/_layouts/15/Doc.aspx?sourcedoc=%7B7C2D36C1-69E1-4F04-882E-622DAB463400%7D&file=SRS%202006.docx&action=default&mobileredirect=true&wdOrigin=WAC.WORD.HOME-BUTTON%2CAPPHOME-WEB.FILEBROWSER.RECENT&wdPreviousSession=59369843-28ac-4b6c-85ca-2faf2c444719&wdPreviousSessionSrc=AppHomeWeb&ct=1730441720975)
- [test cases](https://entuedu-my.sharepoint.com/:w:/g/personal/leep0066_e_ntu_edu_sg/EeBc_fuksGFJkLcF2fgWmkIB5CWCkqzDZ0Nz0vkeBZC3lA?e=Lk9qqH)

**Steps to test and run codes:**  
frontend:  
```
cd sc2006  
npm run dev  # to run codes
```
backend:  
```
cd sc2006
cd backend  #to head to /backend directory 
npm i   # to update libraries installed
npm run dev    # to run codes
```

**Frontend notes:**  
setup instructions:  
```
- we have uploaded all the files here that you may need to start working on the project.
- Follow the tutorial till the tailwind css setup is complete and you can see the Hello World Text.
- Then copy paste all the files here into your project.
- If the  file is not on this page it means it is safe to remove it from the project.
- Some boilerplate filler text is given for each page to assist navigation.
- Please delete all the deleteme.html files once you download the repository.
```

**Backend notes:**  
- we will be using supabase as a websocket to store the user accounts, real-time chat interactions and reviews
- refer to `.env` file for secret key information.  
- supabase tables include
  ```
  - users
    -


  -
  ```
  
# Folder Architectures 
- `:file_folder: src/App.jsx`
  - entry point and main running file and coordiantes the rendering of the app's components and serves as the central hub for setting up routing, state management, and other essential configurations.
- `:file_folder: src/index.css`
  - contains the styling and libraries of tailwind base, components, utilities.
- `:file_folder: src/main.jsx`
  - main entry point to import necessary modules like StictMode, Router, and AuthProvider to wrap the App component. It renders the app to the root element in the HTML, ensuring proper routing, authentication, and strict mode checks.
- `:file_folder: src/assets`
  - contains frontend assets like images.
- `:file_folder: src/components`
  - contains frontend components like clickable cards.
- `:file_folder: src/context`
  - contains AuthContext provider component.
- `:file_folder: src/pages`
  - contains frontend views like Home page, Browse School page and etc. They are the main interfaces that user will be looking at.
