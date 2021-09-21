# Amit's MPC/Force Key-group Builder Scripts v1.01

**Requirements:** You Must Have latest NodeJs (15.4.0 or above) runtime installed on your system (https://nodejs.org/en/download/)

**Necessary Disclaimer:** Note than you use these script on your own free will. The author does not guarantee anything and the operations these scripts perform are based on authors own understanding (however limited that may be) of the said file formats involved.

**Description:** These Scripts are meant to Create Key-groups (Sampled Instruments) for Akai MPC/Force. The Scripts work on folder only and you specify the type of files/conversions and path of the folder in the config.txt file. You still need to go and edit these key-groups, their envelopes, filter and any other synthesis yourself on your device.

&nbsp;  

>   ## Warning:
> An average key-group file size is 905KB, so if you are generating a lot of key-groups its going to fill up your drive quickly. Try to run these scripts on smaller collections first before converting thousands of samples.  

&nbsp;  


## The "Config.txt file"

-   You edit the config.txt files and add the type of conversion and the path of the folder to convert.
-   You can add multiple conversion paths and modes in the config.txt file and it will convert them all.

>   **Note:** If you end the folder/directory path with an \* it will treat the provided path as master folder with its sub-folders(directories) containing the wav files, otherwise wav files are only read from the provided path. This is important if you want to convert a large collection of similar files.

### \*\* The Three Modes

1. ### SCW - Single Cycle Waveforms
   You can download a lot of single cycle wave forms from internet or capture them from any synths you own and/or also extract frames from wavtables. The SCW act as Oscillators like any other subtractive Synth, on MPC/FORCE you have some benefits due to 4 layers in a key-group. you could play all 4 layers together while de-tuning them slightly for classic subtractive synthesis, or use cyclic/random mode to play as wave sequences.
    To effectively use single cycle waveforms their pitch needs to be calculated , which these scripts do automatically. Also with the option SCW_WRITE_SMPL_CHUNK (default enabled), the scripts will add the pitch and loop information to the SCW wav files too. This makes it easier to load any SCW wave file in an existing key-group without worrying about setting its correct pitch. 

    Here is a link to download Tonnes of SCW by Adventure Kid: https://www.adventurekid.se/akrt/waveforms/adventure-kid-waveforms/  

2.  ### SINGLES - Single Sample mapped across the Keyboard/pads.
    In Singles Mode, a New Key-group is created for Each Wav File in the folder and the file is mapped across entire keyboard. If the wav file contains looping points information, those will be used to set the key-group looping points.
    
    Though not very useful, but sometimes you only have a single sample. 

    The Pitch of the Sample is Determined by its Filename. ***see the box below about file naming.

3.  ##  MULTIS - Multi-Sample Mode
    Multi-samples are multiple Samples of an instrument taken at different pitches. in MULTIS mode each folder is considered to be a single instrument and all wav files in the folder to be multi-Samples. The name of Key-group is the name of the Multi-Sample Folder. The Pitch (root note) of each Sample is Determined by its Filename. ***see the box below about file naming. 
    for example if you multi-Sample folder is  : special-flute , each wav file in the folder should have correct pitch number (0-127) or C3,B4,F#5 in the end with space or dash before that. like special-flute 36.wav,special-flute-40.wav etc or special-flute C3.wav,special-flute-F#3.wav etc.. It is up to you to provide correct names / pitches for your samples.

> ## *** SAMPLE Naming Scheme for SINGLES and MULTIS***
> Assuming your multi-Sample folder is named:special-flute , each wav file in the folder should have correct pitch number (0-127) or C3,B4,F#5 in the end of the filename with space or dash before that. 
> Examples: special-flute 36.wav,special-flute-40.wav etc or,  
> 
> special-flute C3.wav,special-flute-F#3.wav etc..  
>   
> It is up to you to organize and provide correct names / pitches for your samples.  
> The Same Naming Convention Rule Apply of SINGLES, just that the folder will contain different Samples each resulting in a new key-group file.
> &nbsp;  
> If the filename does not contain pitch information, but the wav file has that embedded in it, it will try to use that. You can force it to always use embedded by adding PREFER_WAV_EMBEDDED_ROOT to the line starting with #OPTIONS in the config.txt file.


## *** Global Options ***
    The Global Options are added in config.txt on the line starting with #OPTIONS with a space between various options.    

    The Current Options are as Listed Below:    

    1. SCW_WRITE_SMPL_CHUNK  
    Will generate a SMPL meta info and Akai atemp meta chunk and will add it to SCW wav file. SMPL chunk contains Pitch as well as sample loop point.  

    2. PREFER_WAV_EMBEDDED_ROOT  
    Will ignore the note number specified in file name and use the value embedded in the wav file SMPL chunk (useful when samples are coming from another sampler or sound-font) Does not Apply to SCW.  

    3. SCW_HALF_VOLUME  
    Usually SCW are normalized so the Key-group can get very loud compared to everything else. This Options set the Volume to around half.


##  Usage/ Instructions
1.   Organize your Samples to convert into Folders and give them proper names and check that they have their pitches in the end of filename as described in the section above.  

2. Open the Config.txt file in any text Editor.  
3. Provide the Required Conversion Mode (SCW,SINGLES,MULTIS)  followed by the full path of the folder to Process.
4. If you are on Mac/Linux run the run-mac-linux.sh shell script from the terminal. You may need to give it a execute flag to run it by double clicking. run the command: chmod +x run-mac-linux.sh
5. On Windows PC run the  run-win.bat file.
6. Optional: Add this Repo/Subscribe to github watch/Notifications so you are notified on any updates and fixes that come in future.



