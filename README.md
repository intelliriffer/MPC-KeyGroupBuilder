# Amit's MPC/Force Keygroup Builder Scripts

**Requirements:** You Must Have latest NodeJs (15.4.0 or above) runtime installed on your system (https://nodejs.org/en/download/)

**Necessary Disclaimer:** Note than you use these script on your own free will. The author does not guarantee anything and the operations these scripts perform are based on authors own understanding (however limited that may be) of the said file formats involved.

**Description:** These Scripts are meant to Create Keygroups (Sampled Instruments) for Aksi MPC/Force. The Scripts work on folder only and you specify the type of files/conversions and path of the folder in the config.txt file. You still need to go and edit these keygroups, their envelopes, filter and any other synthesis yourself on your device.

&nbsp;  

>   ## Warning:
> An average keygroup file size is 905Kb, so if you are generating a lot of keygroups its going to fill up your drive quickly. Try to run these scripts on smaller collections first before converting thousands of samples.  

&nbsp;  


## The "Config.txt file"

-   You edit the config.txt files and add the type of conversion and the path of the folder to convert.
-   You can add multiple conversion paths and modes in the config.txt file and it will convert them all.

>   **Note:** If you end the folder/directory path with an \* it will treat the provided path as master folder with its sub-folders(directories) containing the wav files, otherwise wav files are only read from the provided path. This is important if you want to convert a large collection of similar files.

### \*\* The Three Modes

1. ### SCW - Single Cycle Waveforms
   You can download a lot of cyngle cyclewave forms from internet or capture them from any synths you own and/or also extract frames from wavtables. The SCW act as Oscillators like any other subtractive Synth, on MPC/FORCE you have some benefits due to 4 layers in a keygroup. you could play all 4 layers together while detuning them slightly for classic subtractive synthesis, or use cyclic/random mode to play as wave sequences.
    To effectively use single cycle wavforms their pitch needs to be calculated , which these scripts do automatically. Also with the option SCW_WRITE_SMPL_CHUNK (default enabled), the scripts will add the pitch and loop information to the SCW wav files too. This makes it easier to load any SCW wave file in an existing keygroup without worrying about setting its correct pitch. 

    Here is a link to download Tonnes of SCW by Adventure Kid: https://www.adventurekid.se/akrt/waveforms/adventure-kid-waveforms/  

2.  ### SINGLES - Single Sample mapped across the Keyboard/pads.
    In Singles Mode, a New Keygroup is created for Each Wav File in the folder and the file is mapped across entire keyboard. If the wav file contains looping poits information, those will be used to set the keygroup looping points.
    
    Though not very useful, but sometimes you only have a single sample. 

    The Pitch of the Sample is Determined by its Filename. ***see the box below about file naming.

3.  ##  MULTIS - Multisample Mode
    Multisamples are multiple Samples of an instrument taken at different pitches. in MULTIS mode each folder is considered to be a single instrument and all wav files in the folder to be multisamples. The name of Keygroup is the name of the Multisample Folder. The Pitch (root note) of each Sample is Determined by its Filename. ***see the box below about file naming. 
    for example if you multisample folder is  : specialflue , each wav file in the folder should have correct pitch number (0-127) or C3,B4,F#5 in the end with space or dash before that. like specialflute 36.wav,specialflute-40.wav etc or specialflute C3.wav,specialflute-F#3.wav etc.. It is up to you to provide correct names / pitches for your samples.

> ## *** SAMPLE Naming Scheme for SINGLES and MULTIS***
> Assuming your multisample folder is named:specialflue , each wav file in the folder should have correct pitch number (0-127) or C3,B4,F#5 in the end of the filename with space or dash before that. 
> Examples: specialflute 36.wav,specialflute-40.wav etc or,  
> 
> specialflute C3.wav,specialflute-F#3.wav etc..  
>   
> It is up to you to organize and provide correct names / pitches for your samples.  
> The Same Naming Convention Rule Apply of SINGLES, just that the folder can contains different Samples

##  Usage/ Instructions
1.   Organize your Samples to convert into Folders and give them proper names and check that they have their pitches in the end of filename as described in the section above.  

2. Open the Config.txt file in any text Editor.  
3. Provide the Required Conversion Mode (SCW,SINGLES,MULTIS)  followed by the full path of the folder to Process.
4. If you are on Mac/Linux run the run-mac-linux.sh shell script fron the terminal. You may need to give it a execude flag to run it by double clicking. run the command: chmod +x run-mac-linux.sh
5. On Windows PC run the  run-win.bat file.
6. Optional: Add this Repo/Subscribe to github watch/Notifications so you are notified on any updates and fixes that come in future.



