# ytPlaylistDownloader

Can download playlist including private ones. Also add ID3 tags when it can find it on ITunes.

## usage
```powershell
npm start
email address: MyEmailAddress 
email password: MyEmailPassword

איתי לוי - אהבה מהתיכון  Itay Levi - Hahava Mehatichon download Completed
faild to download https://www.youtube.com/watch?v=QO0V4Buy1qI
Krewella - Greenlights (Toneshifterz Remix) download Completed
מירי מסיקה - מפחד עלייך  FT. E-Z - איזי download Completed
18/76 videos where downloaded success with metadata: 4 without: 6 failed: 8 
```
The downloaded files can be found in two folders one named musicWithoutMetadata 
and one named musicWithMetadata. The first one contains the mp3 files that it managed to get their ID3 tags 
the scond one those wich it didnt manage to get their ID3 tags.
