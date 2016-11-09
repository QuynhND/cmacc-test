# cmacctest

Sample files for Cmacc

Files are working with the cmacc-compiler that can be downloaded from https://github.com/wilmveel/cmacc-compiler.

Syntax is similar to the syntax used for the electron editor, it is JSON compatible. Files can be edited using a regular code editor. There is a Visual Studio Code plugin that will allow you to preview the files by pressing Ctrl+Shft+h, that is available here: https://marketplace.visualstudio.com/items?itemName=wilmveel.cmacc-vscode.

* Pros: editor can be installed easily (dmg for Mac), and the text can be easily be previewed, so you can easily spot issues. And you do not have to enter HTML, the text can have carriage returns, indentation etc natively
 
* Cons: Nothing too bad, but you have to declare all parameters and carry them over the keys from one file to another if you want to set them later in the process. It can be seen as a good thing actually because it makes it easier to track what is coming from where.

This is still early stage but it is worth exploring and feel free to provide feedback as you play with it.


How it works:

* To set parameters:

$ key = value;

* To call a file and set key within the file called

$ file = [link to file] => {
 "key1" : value1,
 "key2" : value2
};

Note that if the key/value is a link to a file, keys within this linked file are called using "."
In the example above, the value for the key would be called by refering to file.key.

* To display the value of a key, use {{key}}

Using the example above, this would be:
{{key1}} or {{file.key1}}


* The value within a linked file can be a value or another file.

For example see the HelloWorld.cmacc file in this repo:

$ person = [../ID/_person.cmacc];

$ name_Full = [../ID/_person_full.cmacc] => {
	"person" : person
};

{{person.gender.His_Her}} name is {{name_Full}} and {{person.gender.he_she}} lives in {{person.city}}

# Run test
To install cmacc-compiler

```
npm install
sudo npm link
```

Then you can go to the cmacc-test directory and run cmacc there:

...
cmacc HelloWorld.cmacc
...

This creates a .html file that you can view in your browser.

Or you can edit the files in Visual Studio Code and do Ctrl+Shft+h to preview the files.