# PhD Application Lab: Session 4

Academic CV exercise hub. Ready to upload to GitHub Pages.

This package contains all six exercises, editable answer fields, local saving,
timers, progress tracking, teaching cues, final review, PDF export, text export,
and backup/restore. You do not need to install Node.js, run a build, or pay for a
PDF service to publish these files.

## Before you publish

The standard GitHub Pages route below makes the exercise website public. A
private repository does not, by itself, make a GitHub Pages website private.
Built-in private Pages publishing requires an organisation using GitHub
Enterprise Cloud and the relevant access settings.

Follow the public route only if you want people outside your cohort to be able
to open the exercises. This package has no login gate. The existing private
Sites hub is separate and is not changed by downloading or uploading this copy.

Each student's answers stay in that student's browser profile. The app does
not upload answers to GitHub, email them, or submit them to the facilitator.
Anyone using that same browser profile may be able to see its saved answers.

## Install using the GitHub website

### 1. Extract the ZIP

Download `PhD_Application_Lab_Session_4_GitHub.zip` and extract it. On a Mac,
double-click the ZIP. On Windows, right-click it and choose **Extract All**.

Open the extracted `phd-lab-session-4` folder. It contains:

| Item | Purpose |
| --- | --- |
| `index.html` | Main page |
| `styles.css` | Page appearance |
| `app.js` | Navigation, saving and interactions |
| `content.js` | Six exercises and teaching cues |
| `export.js` | Answer-sheet and PDF generation |
| `vendor/` | Bundled PDF library and its licence |
| `README.md` | This guide |

Upload the extracted contents, including the entire `vendor` folder. GitHub
does not unpack an uploaded ZIP into a website. Double-clicking `index.html`
locally is also not a reliable test: the JavaScript modules need web hosting.

### 2. Create a new repository

Sign in at https://github.com and click **+ → New repository**.

- Repository name: `phd-lab-session-4`.
- Description: `Session 4 academic CV exercises for the PhD Application Lab`.
- For the standard free, public hosting route, select **Public** only if you
  accept public access to the website and its uploaded source files.
- Enable **Add a README file** to create the initial `main` branch.
- Click **Create repository**.

Use a separate repository for this hub so that uploading its `index.html` does
not replace the home page of your existing personal website.

### 3. Upload the files

Open the new repository and select **Add file → Upload files**.

Open the extracted folder on your computer. Drag all its contents onto the
upload area, including `vendor` as a folder. Do not drag the outer
`phd-lab-session-4` folder itself: `index.html` needs to appear directly in the
repository's top level. The bundled README can replace the initial README.

Enter a commit message such as `Add Session 4 exercise hub`, choose to commit
directly to `main`, and confirm the commit. If your account requires a pull
request instead, create and merge it so the files reach `main`.

Check the repository's file list: `index.html` should be at the top level,
and opening `vendor` should show `pdf-lib.js` and `pdf-lib-LICENSE.md`.

### 4. Enable GitHub Pages

In the repository, open **Settings → Pages**. Under **Build and deployment**:

| Setting | Choose |
| --- | --- |
| Source | Deploy from a branch |
| Branch | main |
| Folder | / (root) |

Click **Save**. This enables publication of the website. Leave custom-domain
settings empty for the initial setup.

### 5. Open the deployed website

Wait for the Pages deployment to finish. Check the repository's **Actions**
tab for the deployment result, then return to **Settings → Pages** and use the
website link GitHub displays. Initial publication can take several minutes.

The usual address is:

`https://YOUR-USERNAME.github.io/phd-lab-session-4/`

Use GitHub's displayed link as authoritative. An existing custom-domain
configuration can change the address.

### 6. Test answers and the PDF

1. Open the deployed website directly in a normal Chrome, Edge, Firefox or
   Safari tab.
2. Enter a test name and a short answer in Exercise 1.
3. Refresh the page and check that the answer remains.
4. Open **Final review**. A draft can be exported without completing all six
   exercises.
5. Select **Download answers (PDF)**.
6. Wait for **PDF ready**, then select **Save PDF**.
7. Open the downloaded `Session_4_Exercises_and_Answers.pdf` and check your
   name and answer. The PDF includes all six exercises and their prompts;
   unanswered fields are labelled, and long answers continue onto more pages.

If saving is blocked, choose **Open PDF in new tab** and use the PDF viewer's
download button. You can also copy the complete answer text from the save
panel. The PDF is generated on the device; no server setup is required.

After testing, remove your sample responses using **Clear my local responses**
only if you no longer need them. Students opening the website on their own
devices get their own empty workbook.

### 7. Share the website link with participants

Give students the deployed website URL, not the GitHub repository URL. Their
workflow is: complete exercises, review answers, download the PDF, and send it
to you through your normal submission channel.

Students do not need a GitHub account to use a public Pages website. Keep
Google Meet open in another tab; the exercises support individual work and
voluntary whole-room sharing.

## Move answers from the existing hub

Saved responses do not automatically move between website addresses. Before
switching:

1. In the old hub, select **Final review → Download backup (.json)** and then
   **Save file**.
2. Open the new GitHub Pages hub in the browser where you want to work.
3. Select **Restore backup** and choose `Session_4_CV_Backup.json`.
4. Confirm replacement only after saving any existing work in the new hub.
5. Check the restored answers in **Final review**.

Do not upload answer backups, completed PDFs, or participants' CVs into the
public repository. Only the website files in this package need to go there.
Browser storage can be cleared, so keep downloaded backups during the course.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Website shows 404 | Check that deployment has finished, `main` and `/ (root)` are selected, and `index.html` is at the repository's top level. |
| Page is blank or unstyled | Check that all files were uploaded together. Keep the included relative paths; they support repository subfolders. Open the hosted URL, not a local file. |
| PDF button does not work | Verify that `export.js` and `vendor/pdf-lib.js` are uploaded. Refresh the page, try a direct browser tab, and use **Open PDF in new tab** if saving is blocked. |
| Answers disappeared on the new website | Restore the JSON backup from the old hub. Saved answers are tied to the browser and website origin. |
| New uploads are not visible yet | Wait for the Pages deployment in **Actions** to finish, then reload. |

To update the hub later, upload the revised website files to the same paths in
`main` and commit. Pages will deploy the update. Keep the `vendor` folder and
its licence file with the application.

## Content and validation notes

The six exercises and teaching content are the same as in the existing hub.
Slide numbers refer to the built-in 24-slide teaching outline, not a verified
mapping to the Session 4 PowerPoint. This package does not change that mapping.

The GitHub copy uses relative asset paths and removes the old owner-private
hosting statement. It contains no participant responses or account credentials.
Local validation covers asset loading from a repository-style subpath, app
logic, and PDF generation with long-answer pagination. Full browser download
testing on your GitHub URL must be completed after deployment using Step 6.

## Official GitHub references

Instructions checked on 24 September 2026:

- Upload files: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Configure Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Site visibility: https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
