# 05 - Audit Remaining Raw Autoplay Videos

After applying the patches, search the project for raw autoplay videos.

Use one or more of these commands from project root:

```powershell
Select-String -Path src\**\*.tsx,src\**\*.ts -Pattern "<video|autoPlay|preload=\"none\"|heroVideo" -CaseSensitive:$false
```

or:

```bash
grep -RIn "<video\|autoPlay\|preload=\"none\"\|heroVideo" src
```

Expected:

1. `ManagedHeroVideo.tsx` contains the only intentional raw `<video>` element.
2. Data files and page files use `<ManagedHeroVideo ... />` instead of raw `<video autoPlay ...>`.
3. If another raw autoplay video remains, report the exact file and line before modifying it.

Do not patch unknown video blocks without confirming their context.

Managed video contract:

```txt
Video near viewport: may load metadata.
Video visible enough: may request playback.
Coordinator grants playback: pauses all other videos first.
Heavy motion active: pause video.
Tab hidden: pause video.
Offscreen: pause video.
```
