# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I focused on extracting the conditionals as much as possible, so that, by removing all the branching code, the code would be more straightforward to read. I also spent some time on extracting the logic to its own functions and tried to name them with some significance, trying to ensure that the single responsibility principle was being followed. Finally, I chose to use some commonly used functional programming helpers like `pipe` and `curry` to abstract as much as possible the implentation details from the main function. 

By doing so, I could write more specific tests (although I still didn't directly cover some of the methods, I "made the point" that it's simple to be done).