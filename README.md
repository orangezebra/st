# Running
All three solutions contain runnable Javascript, just type "node <file>" at your terminal.


# Assumptions and Notes
- Question 1
In JSON, an Array is an object so, I've written my solution to allow setting depths including arrays as nesting structures, but in the text I print to the screen when an array is encountered, I depict the contents of the array, this tradeoff is to allow the traversal of all object structures (including arrays), but also print out useful information to the screen. For examaple, given the provided data structure, depth levels 0 and 2 are Arrays, so specifying those levels will depict the Arrays themselves, while depth level 1 will show the fields nested one level deeper than the root (an Array/object) which contains both simple key/value pairs as well as Arrays - I show the contents of the Array at this depth in order to make it useful.

- Question 3
There is some implementation of the classes at the end of the file demonstrating the requirements.

