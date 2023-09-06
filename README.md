![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

Welcome robinoldman,

POSSIBLE DATABASE postgres://mdbzjobfumtyrg:fa41208e2fb417a91d354befaba505c8b456e6581aafe66ad406b1a03bef1941@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/dc8i184kjh8i7d


ALLOWED_HOSTS = [
    os.environ.get('ALLOWED_HOST'),
    '8000-robinoldman-virtualclas-pndj7n5qtrs.ws-eu104.gitpod.io',
    'localhost',
    'virtualclassapi-47c98bf9be9a.herokuapp.com'
]

import os

os.environ['CLOUDIANRY_URL'] = 'cloudinary://962444711949455:IEF70dVolBgsnC0nr_HzBPQZYuA@dwpdkpzlx'
os.environ['SECRET_KEY'] = 'SecretKeyRobinOldman'
#os.environ['DEV'] = '1'
os.environ['CLIENT_ORIGIN'] = 'https://3000-robinoldman-virtualclas-bv0hal62iso.ws-eu104.gitpod.io'
os.environ['ALLOWED_HOST'] = '8000-robinoldman-virtualclas-pndj7n5qtrs.ws-eu104.gitpod.io'
os.environ['DATABASE_URL'] = 'postgres://wxnltetf:KWYZI9A94_0gTnTjmjeA7Qb5yGyJWd6_@surus.db.elephantsql.com/wxnltetf'

pip freeze > requirements.txt

asgiref==3.7.2
cloudinary==1.33.0
dj-database-url==0.5.0
dj-rest-auth==2.1.9
Django==3.2.20
django-allauth==0.44.0
django-cloudinary-storage==0.3.0
django-cors-headers==4.2.0
django-filter==23.2
djangorestframework==3.14.0
djangorestframework-simplejwt==5.2.2
gunicorn==21.2.0
oauthlib==3.2.2
Pillow==10.0.0
psycopg2==2.9.7
PyJWT==2.8.0
python3-openid==3.2.0
requests-oauthlib==1.3.1
sqlparse==0.4.4
urllib3==1.26.16

This is the Code Institute student template for Gitpod. We have preinstalled all of the tools you need to get started. It's perfectly ok to use this template as the basis for your project submissions.

You can safely delete this README.md file, or change it for your own project. Please do read it at least once, though! It contains some important information about Gitpod and the extensions we use. Some of this information has been updated since the video content was created. The last update to this file was: **September 1, 2021**

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

To run a backend Python file, type `python3 app.py`, if your Python file is named `app.py` of course.

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

In Gitpod you have superuser security privileges by default. Therefore you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

To log into the Heroku toolbelt CLI:

1. Log in to your Heroku account and go to *Account Settings* in the menu under your avatar.
2. Scroll down to the *API Key* and click *Reveal*
3. Copy the key
4. In Gitpod, from the terminal, run `heroku_config`
5. Paste in your API key when asked

You can now use the `heroku` CLI program - try running `heroku apps` to confirm it works. This API key is unique and private to you so do not share it. If you accidentally make it public then you can create a new one with _Regenerate API Key_.

------

## Release History

We continually tweak and adjust this template to help give you the best experience. Here is the version history:

**September 1 2021:** Remove `PGHOSTADDR` environment variable.

**July 19 2021:** Remove `font_fix` script now that the terminal font issue is fixed.

**July 2 2021:** Remove extensions that are not available in Open VSX.

**June 30 2021:** Combined the P4 and P5 templates into one file, added the uptime script. See the FAQ at the end of this file.

**June 10 2021:** Added: `font_fix` script and alias to fix the Terminal font issue

**May 10 2021:** Added `heroku_config` script to allow Heroku API key to be stored as an environment variable.

**April 7 2021:** Upgraded the template for VS Code instead of Theia.

**October 21 2020:** Versions of the HTMLHint, Prettier, Bootstrap4 CDN and Auto Close extensions updated. The Python extension needs to stay the same version for now.

**October 08 2020:** Additional large Gitpod files (`core.mongo*` and `core.python*`) are now hidden in the Explorer, and have been added to the `.gitignore` by default.

**September 22 2020:** Gitpod occasionally creates large `core.Microsoft` files. These are now hidden in the Explorer. A `.gitignore` file has been created to make sure these files will not be committed, along with other common files.

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

------

## FAQ about the uptime script

**Why have you added this script?**

It will help us to calculate how many running workspaces there are at any one time, which greatly helps us with cost and capacity planning. It will help us decide on the future direction of our cloud-based IDE strategy.

**How will this affect me?**

For everyday usage of Gitpod, it doesn’t have any effect at all. The script only captures the following data:

- An ID that is randomly generated each time the workspace is started.
- The current date and time
- The workspace status of “started” or “running”, which is sent every 5 minutes.

It is not possible for us or anyone else to trace the random ID back to an individual, and no personal data is being captured. It will not slow down the workspace or affect your work.

**So….?**

We want to tell you this so that we are being completely transparent about the data we collect and what we do with it.

**Can I opt out?**

Yes, you can. Since no personally identifiable information is being captured, we'd appreciate it if you let the script run; however if you are unhappy with the idea, simply run the following commands from the terminal window after creating the workspace, and this will remove the uptime script:

```
pkill uptime.sh
rm .vscode/uptime.sh
```

**Anything more?**

Yes! We'd strongly encourage you to look at the source code of the `uptime.sh` file so that you know what it's doing. As future software developers, it will be great practice to see how these shell scripts work.

---

Happy coding!
