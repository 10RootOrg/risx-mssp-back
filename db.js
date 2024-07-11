const dotenv = require("dotenv").config();

// const AAA = {
//     SHELL: '/bin/bash',
//     COLORTERM: 'truecolor',
//     NVM_INC: '/home/Bacteria5570/.nvm/versions/node/v20.14.0/include/node',
//     TERM_PROGRAM_VERSION: '1.91.0',
//     PWD: '/home/Bacteria5570/mssp/risx-mssp-back',
//     LOGNAME: 'Bacteria5570',
//     XDG_SESSION_TYPE: 'tty',
//     VSCODE_GIT_ASKPASS_NODE: '/home/Bacteria5570/.vscode-server/cli/servers/Stable-ea1445cc7016315d0f5728f8e8b12a45dc0a7286/server/node',
//     MOTD_SHOWN: 'pam',
//     HOME: '/home/Bacteria5570',
//     LANG: 'C.UTF-8',
//     LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:',
//     SSL_CERT_DIR: '/usr/lib/ssl/certs',
//     GIT_ASKPASS: '/home/Bacteria5570/.vscode-server/cli/servers/Stable-ea1445cc7016315d0f5728f8e8b12a45dc0a7286/server/extensions/git/dist/askpass.sh',
//     SSH_CONNECTION: '85.64.193.33 51047 10.5.0.18 22',
//     NVM_DIR: '/home/Bacteria5570/.nvm',
//     VSCODE_GIT_ASKPASS_EXTRA_ARGS: '',
//     SGX_AESM_ADDR: '1',
//     LESSCLOSE: '/usr/bin/lesspipe %s %s',
//     XDG_SESSION_CLASS: 'user',
//     TERM: 'xterm-256color',
//     LESSOPEN: '| /usr/bin/lesspipe %s',
//     USER: 'Bacteria5570',
//     VSCODE_GIT_IPC_HANDLE: '/run/user/1000/vscode-git-14394393b2.sock',
//     SHLVL: '1',
//     NVM_CD_FLAGS: '',
//     XDG_SESSION_ID: '110',
//     XDG_RUNTIME_DIR: '/run/user/1000',
//     SSL_CERT_FILE: '/usr/lib/ssl/certs/ca-certificates.crt',
//     SSH_CLIENT: '85.64.193.33 51047 22',
//     VSCODE_GIT_ASKPASS_MAIN: '/home/Bacteria5570/.vscode-server/cli/servers/Stable-ea1445cc7016315d0f5728f8e8b12a45dc0a7286/server/extensions/git/dist/askpass-main.js',
//     XDG_DATA_DIRS: '/usr/share/gnome:/usr/local/share:/usr/share:/var/lib/snapd/desktop',
//     BROWSER: '/home/Bacteria5570/.vscode-server/cli/servers/Stable-ea1445cc7016315d0f5728f8e8b12a45dc0a7286/server/bin/helpers/browser.sh',
//     PATH: '/home/Bacteria5570/miniconda3/bin:/home/Bacteria5570/.vscode-server/cli/servers/Stable-ea1445cc7016315d0f5728f8e8b12a45dc0a7286/server/bin/remote-cli:/home/Bacteria5570/.local/bin:/home/Bacteria5570/miniconda3/bin:/home/Bacteria5570/.nvm/versions/node/v20.14.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin',
//     DBUS_SESSION_BUS_ADDRESS: 'unix:path=/run/user/1000/bus',
//     NVM_BIN: '/home/Bacteria5570/.nvm/versions/node/v20.14.0/bin',
//     TERM_PROGRAM: 'vscode',
//     VSCODE_IPC_HOOK_CLI: '/run/user/1000/vscode-ipc-25ef7a5f-d25f-4785-b982-355b76fbb72b.sock',
//     _: '/home/Bacteria5570/.nvm/versions/node/v20.14.0/bin/nodemon',
//     OLDPWD: '/home/Bacteria5570/mssp',
//     PORT: '5555',
//     NODE_ENV: 'development',
//     DATABASE_USER: 'shoresh',
//     DATABASE_PASSWORD: '10RootRulez!$',
//     DATABASE_HOST: 'localhost',
//     DATABASE_SQL_PORT: '3306',
//     DATABASE_NAME: 'test2',
//     FRONT_IP: '40.69.58.105',
//     FRONT_URL: 'http://mssp-dev.northeurope.cloudapp.azure.com',
//     FRONT_PORT: '3003',
//     DEHASHED_U: 'shoresh100@proton.me:wjaf4rcr5y1dutcrhefkkpffacs79m5h',
//     DEHASHED_H: 'Accept:application/json',
//     PYTHON_SCRIPTS_RELATIVE_PATH: 'risx-mssp-python-script/',
//     PYTHON_INTERVAL: 'Interval.py',
//     PYTHON_MANUAL_ACTIVE: 'main.py',
//     PYTHON_EXECUTABLE: '/home/Bacteria5570/mssp/risx-mssp-python-script/mssp_env/bin/python3.10'
//   }







const environment = process.env["NODE_ENV"] || 'development';
// const environment = process.env.NODE_ENV || 'development';

// console.log("process.env------" ,process.env);
// console.log("1111111" ,process.env["NODE_ENV"]);
// console.log("22222222" ,AAA["NODE_ENV"]);
console.log("backend running NODE_ENV -" , process.env["NODE_ENV"]);



const config = require('./knexfile')[environment];
console.log("config 3333333 ",config);
const DBConnection = require('knex')(config);
 
 

module.exports = DBConnection;
