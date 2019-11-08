# InstaCrop

We all know, the image cropping of portrait pictures on Instagram and other services is ridiculous. So I build this app to get the pictures in the right format without the need to crop them. Simply drop a bunch of images to the app and they will be processed and saved in the same path in a new folder.

![alt text](https://www.jerry-arnstadt.de/wp-content/uploads/2019/11/InstaCrop-Before-After.jpg "Before and After")


> Boilerplate to kickstart creating an app with [Electron](https://github.com/electron/electron)

See [awesome-electron](https://github.com/sindresorhus/awesome-electron) for more useful Electron resources.

See [Caprine](https://github.com/sindresorhus/caprine) for a production app based on this boilerplate.

## Download 

- [MacOS](https://github.com/artifactdev/InstaCrop/releases/download/v1.0.0/InstaCrop-1.0.0.dmg)
- [Linux](https://github.com/artifactdev/InstaCrop/releases/download/v1.0.0/InstaCrop_1.0.0_amd64.deb)
- [Windows](https://github.com/artifactdev/InstaCrop/releases/download/v1.0.0/InstaCrop.Setup.1.0.0.exe)


## Features

- [`electron-builder`](https://www.electron.build) fully set up to create cross-platform builds
- [Builds the app on Travis](https://www.electron.build/multi-platform-build.html)
- [Silent auto-updates](https://www.electron.build/auto-update.html)
- App menu that adheres to the system user interface guidelines
- [Config handling](https://github.com/sindresorhus/electron-store)
- [Context menu](https://github.com/sindresorhus/electron-context-menu)
- [User-friendly handling of unhandled errors](https://github.com/sindresorhus/electron-unhandled)
- Easily publish new versions to GitHub Releases
- And much more!


## Getting started

**Click the "Use this template" button.**

Alternatively, create a new directory and then run:

```
$ curl -fsSL https://github.com/sindresorhus/electron-boilerplate/archive/master.tar.gz | tar -xz --strip-components 1
```

There's also a [Yeoman generator](https://github.com/sindresorhus/generator-electron).


---

**Remove everything from here and above**

---


# App Name

> InstaCrop


## Install

*macOS 10.10+, Linux, and Windows 7+ are supported (64-bit only).*

**macOS**

[**Download**](https://github.com/user/repo/releases/latest) the `.dmg` file.

**Linux**

[**Download**](https://github.com/user/repo/releases/latest) the `.AppImage` or `.deb` file.

*The AppImage needs to be [made executable](http://discourse.appimage.org/t/how-to-make-an-appimage-executable/80) after download.*

**Windows**

[**Download**](https://github.com/user/repo/releases/latest) the `.exe` file.


---


## Dev

Built with [Electron](https://electronjs.org).

### Run

```
$ npm install
$ npm start
```

### Publish

```
$ npm run release
```

After Travis finishes building your app, open the release draft it created and click "Publish".
