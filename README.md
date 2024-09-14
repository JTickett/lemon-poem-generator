# Lemon poem generator

This repository demonstrates how to create a ‘lemon poem generator’ as a simple [Express](https://expressjs.com/) server and webpage. 

A live version of the project is available here: [lemon-poem-generator.onrender.com](https://lemon-poem-generator.onrender.com/) 

(The live version may take a few minutes to ‘spin up’, as it is hosted on the free tier of [Render.com](http://Render.com))

The server uses the [OpenAI API](https://platform.openai.com/docs/overview) to generate a poem about lemons 🍋, courtesy of the large language model [GPT-4o mini](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/). 

![image](https://github.com/user-attachments/assets/92b3c4e4-e779-4b23-be85-1cefcc0e3c19)

This README contains a full tutorial for how to make this project from scratch, yourself! 🦾
## Prerequisites

- A GitHub account
- Access to a command line terminal — preferably Bash
    - For Windows, PowerShell or Git Bash should be fine
        - PowerShell should be built in to Windows
        - Git Bash: [git-scm.com/downloads](https://git-scm.com/downloads)
- Visual Studio Code (VSCode) installed
    - [code.visualstudio.com/download](https://code.visualstudio.com/download)
    - The web browser version of VSCode is probably fine for this project: 
    [vscode.dev](https://vscode.dev/)
- Node installed
    - https://nodejs.org/en/download/package-manager
    - Check Node is installed with `node -v` in the terminal
    - npm (Node Package Manager) should be installed by default with Node, but check with: 
    `npm -v`
- An OpenAI account
    - Go here and it will prompt you to log in or sign up: 
    [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
    - You will need to have credits in your account to use the API! 
    You may get some free credits with a new account; otherwise you will need to add a bank card. Most API calls to OpenAI should cost less than a penny — unless you have a very long conversation!

## Tutorial

### Make GitHub repo

- Go to [github.com/new](https://github.com/new)
- Give the repo a name
- Click “Create repository”
    - (Assuming you used ‘lemon-poem-generator’ from here on in)

*You now have an empty repository on GitHub* 🙂

### Make a new folder for your project

- (From your projects folder of choice)
- Make a project directory:  
`mkdir lemon-poem-generator`

### Make a local Git repo

- Move into the new project directory:  
`cd lemon-poem-generator`
- Make a Readme (we need at least one file for the initial commit):  
`echo "# lemon-poem-generator" >> README.md`
    - (Or do this in VSCode)
- Initialise the local Git repository:  
`git init`
- Check the Git repo works:  
`git status`
- Add the contents of the current directory (folder) to the Git repo:  
`git add .`
    - Where `.` indicates the current directory
    - (Currently the directory only contains the Readme file, so we could also use 
    `git add README.md`)
- (I like to always check the `add` command is successful:  
`git status`)
- Make our first Git commit:  
`git commit -m "Initial commit"`
- GitHub expects a `main` branch but some versions of Git use `master` instead — how colonial.  
Let’s make sure `main` is our main branch:  
`git branch -M main`
- Connect the GitHub repo we made earlier to our local repo:  
`git remote add origin https://github.com/*<your username>*/lemon-poem-generator.git`
- Push your first commit from your local machine up to GitHub:  
`git push -u origin main`
- Check the push was successful:  
Go back to your GitHub repo in the browser and refresh the page

*You now have a local Git repo that is connected to your GitHub repo, and you can push changes made locally to GitHub. You can save your work on GitHub and deploy from here!* 😀

### Make a new Express project

- Initialise a new npm project, so we can install dependencies:  
`npm init`
    - Press enter for all the options — or alternatively use `npm init -y`
    - This just makes a new `package.json` file
- Install dependencies:  
`npm install express dotenv openai`
- Install *development* dependencies:  
`npm install -D nodemon`
- Add a `.gitignore` file, so we don’t send unnecessary dependency files to GitHub:  
`echo 'node_modules/' > .gitignore`
- Make an `index.js` file:  
`touch index.js`
- Make an `app.js` file:  
`touch app.js`
- Open up VSCode on this directory:  
`code .`
    - Where `.` is the current directory, and VSCode is aliased in the terminal as `code`
    - Alternatively, open up VSCode (or your text editor of choice) another way, and select this folder.
- Add `"type": "module",` to `package.json`, so we can use ES6 import/export syntax
    - This is newer and will become the standard over CommonJS `require` syntax, so might as well use it (React does, as it runs in the browser)
    - (Further reading here: https://medium.com/@rahul.jindal57/es6-imports-vs-commonjs-imports-8e9b66aa04bd )

### Create a basic server

- In `app.js:`
    
    ```jsx
    import express from 'express';
    
    const app = express();
    
    app.get(
        '/', 
        (req, res) => {
            res.send('Hello from my lovely new server!');
        }
    );
    
    export default app;
    ```
    
- In `index.js`
    
    ```jsx
    import app from './app.js';
    
    const PORT = 3000;
    
    app.listen(
        PORT,
        () => {
            console.log(`Server is running on port ${PORT}`);
        }
    );
    ```
    
- Add `"dev": "nodemon index.js",` inside `"scripts":` in `package.json`
    
    ```jsx
      "scripts": {
        "dev": "nodemon index.js",
      },
    ```
    
- Run the development server locally:  
`npm run dev`
- Go to [`http://localhost:3000/`](http://localhost:3000/) in the browser
    - You should see “Hello from my lovely new server!” displayed on the page!
    - To stop the server: CRTL + C in the terminal
- Commit your work so far:  
`git add .`  
`git status` (check the correct files are going to be committed)  
`git commit -m "Make basic server"`  
`git push`

*You now have a basic web server running locally!* 😀

### Connect to OpenAI

- Make a local environmental file to save our OpenAI API key:  
`touch .env`
    - (Or just create this file in VSCode)
- Add `.env` to your `.gitignore`:  
`echo '.env' >> .gitignore`
    - ⚠️ **This is important!** You do not want to upload your API key to GitHub, because other people may steal it, and it is generally quite embarrassing…
    - Your `.gitignore` should now look like this:
        
        ```jsx
        node_modules/
        .env
        ```
        
- Get an API key from OpenAI, by going here:  
[platform.openai.com/api-keys](https://platform.openai.com/api-keys)
and clicking “Create new secret key”
    - You can’t copy the API key after you navigate away from this page!   
    You can always make a new API key if you lose it though, so don’t worry! 🙂
- Copy the key into your `.env` as the value of the property `OPENAI_API_KEY`:
    
    ```
    OPENAI_API_KEY=<your api key>
    ```
    
    - For example, if my API key were `iloveai123`:
        
        ```
        OPENAI_API_KEY=iloveai123
        ```
        
    - Don’t forget the `=` !
- Make a new file to hold the logic to call the OpenAI API:  
`touch services/openai.js`
    - (Or just make this file in VSCode)
- In `services/openai.js`:
    
    ```jsx
    import OpenAI from 'openai';
    import dotenv from 'dotenv';
    dotenv.config();
    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    async function chatCompletion(prompt) {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o-mini",
        });
        return chatCompletion.choices[0].message.content;
    }
    
    export default chatCompletion;
    ```
    
- In `app.js`:
    - Import the `chatCompletion()` function:
        
        ```jsx
        import chatCompletion from './services/openai.js';
        ```
        
    - Add a route to test the connection to OpenAI:
        
        ```jsx
        app.get(
            '/test',
            async (req, res) => {
                const response = await chatCompletion("Provide an amusing sentence.");
                res.send(response);
            }
        );
        ```
        
    - The entire contents of `app.js` should now look like this:
        
        ```jsx
        import express from 'express';
        import chatCompletion from './services/openai.js';
        
        const app = express();
        
        app.get(
            '/',
            (req, res) => {
                res.send('Hello from my lovely new server!');
            }
        );
        
        app.get(
            '/test',
            async (req, res) => {
                const response = await chatCompletion("Provide an amusing sentence.");
                res.send(response);
            }
        );
        
        export default app; 
        ```
        
- Go to `http://localhost:3000/test`
    - You should see a message from our friend GPT-4o mini along the lines of:
        
        > *”I told my computer I needed a break, and now it refuses to stop sending me vacation ads for tropical islands.”*
        > 
    - Language models have a peculiar sense of humour, so enjoy refreshing the page a few times until you are sufficiently amused/confused/baffled/concerned.
- Don’t forget to commit your work so far!  
`git add .`  
`git commit -m "Add OpenAI connection & test endpoint"`  
`git push`

*You now have a web server that sends a message of your choice to the large language model GPT-4o mini via OpenAI’s API* 😃

### Serve a webpage from the server

- Make a new HTML file:  
`touch public/index.html`
    - (Or just create this file in VSCode)
- In `public/index.html`:
    
    ```jsx
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>🍋 Lemon Poem Generator</title>
    
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
    
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
    
                background-color: #acbb5f;
                background-image: linear-gradient(62deg, #acbb5f 0%, #ecb338 100%);
                color: ghostWhite;
                font-family: 'Vollkorn', serif;
                text-align: gold;
            }
    
            main {
                margin: 0 3rem;
            }
    
            h1 {
                margin-bottom: 1rem;
                font-size: 1rem;
                font-weight: 500;
                text-transform: uppercase;
            }
    
            p {
                font-size: 2rem;
                font-weight: 500;
            }
    
            p.poem {
                display: flex;
                flex-direction: column;
                gap: 1.2rem;
                font-style: italic;
                letter-spacing: 0.04ch;
            }
        </style>
    
    </head>
    
    <body>
        <main>
            <h1>A generated poem</h1>
            <p class="poem">
                <!-- Our poem will go here! -->
            </p>
        </main>
    </body>
    
    </html>
    ```
    
    - This gives us a nicely styled webpage, with a web font from Google Fonts 👨‍🎨
- We don’t need our generic ‘Hello World’ endpoint anymore. We can remove these lines from `app.js` (or comment them out):
    
    ```jsx
    app.get(
        '/',
        (req, res) => {
            res.send('Hello from my lovely new server!');
        }
    );
    ```
    
- We want an endpoint to get the poem. In `app.js`:
    
    ```jsx
    app.get(
        '/get-poem',
        async (req, res) => {
            const response = await chatCompletion(
                "Write a short, expressive poem about lemons, as if you are hungry. Just four lines!"
            );
            res.send({ poem: response });
        }
    );
    ```
    
- Check our lemon poem endpoint works, by going to `http://localhost:3000/get-poem`
    - You should see a poem about lemons! 🍋
    
    > *Oh, golden orbs with sunlit gleam, A twist of zest, my hungry dream. Sour whispers dance upon my tongue, In every drop, my cravings sung.*
    > 
- The entire contents of `app.js` should now look like this:
    
    ```jsx
    import express from 'express';
    import chatCompletion from './services/openai.js';
    
    const app = express();
    
    app.use(express.static('public'));
    
    app.get(
        '/get-poem',
        async (req, res) => {
            const response = await chatCompletion(
                "Write a short, expressive poem about lemons, as if you are hungry. Just four lines!"
            );
            res.send({ poem: response });
        }
    );
    
    app.get(
        '/test',
        async (req, res) => {
            const response = await chatCompletion("Provide an amusing sentence.");
            res.send(response);
        }
    );
    
    export default app;
    ```
    
- Add a script to `index.html`:
    
    ```jsx
    <script>
        const poemParagraph = document.getElementById('poem-paragraph');
    
        fetch('/get-poem')
            .then(response => response.json())
            .then(data => {
                data.poem
                    .split('\n')
                    .forEach(line => {
                        const span = document.createElement('span');
                        span.textContent = line;
                        document.getElementById('poem-paragraph').appendChild(span);
                    });
            });
    </script>
    ```
    
    - This should go between the closing `</body>` tag and the closing `</html>` tag.
        - (Alternatively we could also put the script at the `<head>` tag at the top of the file, with a `defer` attribute.)
- The entire contents of `index.html` should now look like this:
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>🍋 Lemon Poem Generator</title>
    
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
    
                background-color: #acbb5f;
                background-image: linear-gradient(62deg, #acbb5f 0%, #ecb338 100%);
                color: ghostWhite;
                font-family: 'Vollkorn', serif;
                text-align: gold;
            }
    
            main {
                margin: 0 3rem;
            }
    
            h1 {
                margin-bottom: 1rem;
                font-size: 1rem;
                font-weight: 500;
                text-transform: uppercase;
            }
    
            p {
                font-size: 2rem;
                font-weight: 500;
            }
    
            p.poem {
                display: flex;
                flex-direction: column;
                gap: 1.2rem;
                font-style: italic;
                letter-spacing: 0.04ch;
            }
        </style>
    
    </head>
    
    <body>
        <main>
            <h1>A generated poem</h1>
            <p id="poem-paragraph" class="poem">
                <!-- Our poem will go here! -->
            </p>
        </main>
    </body>
    
    <script>
        const poemParagraph = document.getElementById('poem-paragraph');
    
        fetch('/get-poem')
            .then(response => response.json())
            .then(data => {
                data.poem
                    .split('\n')
                    .forEach(line => {
                        const span = document.createElement('span');
                        span.textContent = line;
                        document.getElementById('poem-paragraph').appendChild(span);
                    });
            });
    </script>
    
    </html>
    ```
    
- Go to `http://localhost:3000/` and check your lemon poem generator works!
- Don’t forget to commit your work:  
`git add .`  
`git commit -m "Add public HTML & get-poem endpoint"`  
`git push`

*You now have an instant lemon poem generator, powered by AI!* 😲 🍋

## Further fun

- Can you deploy the lemon poem generator? [Render.com](http://Render.com) will let you deploy an Express app for free, as will many other hosting websites.
- Should there be some “Loading…” text while the poem is being generated?
- Perhaps you can make a poem about something else? Or, include an `<input>` form on the page which prompts the user to decide the subject of the poem.

The world is your oyster 🦪

*Remember:* If you get stuck, just ask our good friend ChatGPT for help! It is very friendly 😊
[chatgpt.com](https://chatgpt.com/)
