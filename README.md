# cmacc-test

Sample files for Cmacc

Files are working with the cmacc-compiler that can be downloaded from https://github.com/wilmveel/cmacc-compiler and with the Visual Studio Code plugin.

If you are using Visual Studio Code (easiest option to experiment) you can get the plugin from the marketplace (search for CMACC).
Also accessible from here: https://marketplace.visualstudio.com/items?itemName=wilmveel.cmacc-vscode.
Use Ctrl+Shft H to preview docs

If you want to install the cmacc-compiler (requires node.js installed):

```
npm install
```

then

```
sudo npm link
```

Syntax is similar to the syntax used for the electron editor, it is JSON compatible. 
Files can be edited using a regular code editor. 

* Pros: editor can be installed easily (dmg for Mac), and the text can be easily be previewed, so you can easily spot issues. And you do not have to enter HTML, the text can have carriage returns, indentation etc natively
 
* Cons: You have to declare all parameters and carry them over the keys from one file to another if you want to set them later in the process. It can be seen as a good thing actually because it makes it easier to track what is coming from where.

This is still early stage but it is worth exploring and feel free to provide feedback as you play with it.


How it works:

* To set parameters:

```
$ key = value;
```

* To call a file and set key within the file called

```
$ file = [link to file] => {
 "key1" : value1,
 "key2" : value2
};
```

Note that if the key/value is a link to a file, keys within this linked file are called using "."
In the example above, the value for the key would be called by refering to file.key.

* To display the value of a key, use {{key}}

Using the example above, this would be:
{{key1}} or {{file.key1}}

* The value within a linked file can be a value or another file.

For example see the HelloWorld.cmacc file in this repo:

```
$ person = [../ID/_person.cmacc];

$ name_Full = [../ID/_person_full.cmacc] => {
	"person" : person
};

{{person.gender.His_Her}} name is {{name_Full}} and {{person.gender.he_she}} lives in {{person.city}}
```

* Note that when you call parameters from other files, the list of docs to refer to can become long. When it is the case it is possible to set a parameter to shorten them all. For example:
if my seller info comes from a previous doc: ordered.order.seller
I can set $ seller = ordered.order.seller
Then I can call the seller's name:
seller.name_Full instead of ordered.order.seller.name_Full

# Run test
If you are using the compiler, install cmacc-compiler

```
npm install
sudo npm link
```

Then you can go to the cmacc-test directory and run cmacc there:

```
cmacc HelloWorld.cmacc
```

This creates a .html file that you can view in your browser.

Or you can edit the files in Visual Studio Code and do Ctrl+Shft+h to preview the files.

# Best practices

## naming conventions

I like to use small caps for files and variables. If the variable is composed of several words, then I use a capital letter for the following word.
For example $ small_Cap

Careful: there are some reserved words that cannot be used for file names, otherwise you will get errors.
A list of these reserved words is here: https://mathiasbynens.be/notes/reserved-keywords

## Addresses
Addresses are in Geo. A reference to an address is a reference to a geo.cmacc file located in a given Country > State > County > City > Street > Number directory.
The way to display an address is by using the _adr_12.cmacc file.
So 55 Broadway St, Cmabridge, MA 02142 is a geo.cmacc file created in USA > MA > Middlesex > Broadway St > 55 directory.
The file looks like this: 

```
street_Num = "55";

zip = "02142";

street = [../../BroadwaySt.cmacc];
```

Note that the file references BroadwaySt.cmacc, which contains the info for the street:

```
$ name = "Broadway St";

$ city = [../Cambridge.cmacc];
```

Similarly, the street file references the city it belongs to, Cambridge.cmacc, which itself will reference the country it belongs to, and so on.
Cambridge.cmacc is:

```
$ name = "Cambridge";

$ county = [../Middlesex.cmacc];
```

Middlesex.cmacc is:

```
$ name = "Middlesex";

$ state = [../MA.cmacc];
```

MA.cmacc is:

```
$ name = "Massachusetts";

$ statecode = "MA";

$ flower = "Mayflower";

$ constitution = "Constitution of the Commonwealth of Massachusetts";

$ country = [../USA.cmacc];
```

USA.cmacc is:

```
$ name = "United States of America";
```

## Accounts

We use a similar schema for Bank (or other) Account information. The account info is in a acct.cmacc file which is located in Acct > entity > acctID > acctnum folder.

## Identities

Identity is tracked in the ID folder in the cmacc-test directory, but when you start using Cmacc for private use, this may change.

- If you have a lot of a specific contract (for example a consent form) you can keep all IDs in the ID folder. 

- But if you have a project based business with a new customer for each project and several documents/contracts for a given project, then you may want to create a new folder for each customer/partner, and this folder will include its ID and all the documents defining the relationship with this specific party.
So the folder structure will look like Customer_X > NDA or Customer_X > MOU, with the Customer_X.cmacc file defining the Customer at the top of the directory with its name.

## Generic forms

### Displaying, formatting

Generic forms used for presentation purposes are kept in the Country folder, because typically definitions and presentations are specific to a geography (how you display addresses or how you present a person or an entity).
Example of these generic forms are _entity.cmacc, _individual.cmacc, _entity_NEA.cmacc (name, entity description, address), _entity_individual.cmacc (an individual presented as an entity).

### Gender, Pronouns

Generic forms related to gender are kept in the ID folder for now.
he.cmacc, she.cmacc and maybe it.cmacc at some point (IoT)
For French we have similar things: _il.cmacc _elle,cmacc etc.

Generic forms related to pronouns are kept in the Country folder. This allows to build documents that can then be customize to reflect the sex of the person, or whether they are for a group (we) or for an individual (I). So we have _pron.cmacc, _plur.cmacc, _sing.cmacc, and generic forms like signature blocks, that can be re-used from one document to the other: _sign_Block_2.cmacc, _sign.cmacc etc.

The list of generic forms available will grow as we identify re-usable pieces in the production of documents. Feel free to submit you own form as you see fit.

### Numbering

If you want to track sections in a doc, you can use section_Xnum to set the section number, and then you can refer to it in other parts of the document.
For example:

```
$ conf_Xnum = "2";

$ IP_Xnum = "3";

$ law_Xnum = "4";

```

and then in the document the sections can be shown as this:

```
{{conf_Xnum}}. Section on confidentiality refering to IP information as described in section {{IP_Xnum}}
{{IP_Xnum}}. Section on Intellectual Property
{{law_Xnum}}.Section on jurisdiction
```
