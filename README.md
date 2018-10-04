# Free Code Camp - Applied InfoSec Challenges
=============================================

This is the repository for the first 11 freeCodeCamp [Information Security with HelmetJS Challenges](https://learn.freecodecamp.org/information-security-and-quality-assurance/information-security-with-helmetjs/).  
For the challenges from the 12th on upwards, you have to clone [this one](https://github.com/freeCodeCamp/boilerplate-bcrypt). 

If you haven't worked with **git** before, you might first want to read a few   
[resources](http://try.github.io/) about it, or go the [Glitch](https://glitch.com/) 
way as described on the above mentioned challenge introduction page.

To clone this Repository, go to a directory of your choice and enter:
```
git clone https://github.com/freeCodeCamp/boilerplate-infosec.git
cd boilerplate-infosec
```
But to be able to import it in Glitch or the coding platform of your choice,  
you have to [create your own Repository on GitHub](https://help.github.com/articles/creating-a-new-repository/).  
But before you are able to push to it, you have to remove the remote origin of
freeCodeCamp,   
rename the "gomix" branch to "master" and delete the gomix branch
to have a clutter free Repository:
```
git remote remove origin
git branch -m master
git branch -d gomix
```
Then follow the steps outlined in **...or push an existing repository from the command line**  
on the **Quick setup** screen, e.g.:
```
git remote add origin git@github.com:<yourname>/<your_repository>.git
git push -u origin master
```

Now you should have a fully functional Repository you can import to a coding platform.  
But to develop locally, there is one more step necessary, run:
```
npm install
```

Don't forget to commit and push your changes after each challenge step (and, 
depending on your coding platform      
of choice, reimport it there), so freeCodeCamp is able to test your results!  

*Happy Coding!*