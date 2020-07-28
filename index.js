// Creates a node containing the data and a reference to the next item
class _Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// You can start by creating the constructor method for the stack. start with an empty 1st node, represented by null and this indicates the top of the stack.

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    /* If the stack is empty, then the node will be the
       top of the stack */
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }

    /* If the stack already has something, 
       then create a new node,
       add data to the new node, and
       have the pointer point to the top */
    const node = new _Node(data, this.top);
    this.top = node;
  }

  pop() {
    /* In order to remove the top of the stack, you have to point
       the pointer to the next item and that next item becomes the
       top of the stack */
    const node = this.top;
    this.top = node.next;
    return node.data;
  }

  peek() {
    let node = this.top
    if (node.next === null) {
      node = node
    }
    while (node.next !== null) {
      if (node.next === null) {
        node = node

      }
      node = node.next
    }
    return node
  }

  isEmpty() {
    const node = this.top
    return node === null
  }

  display() {
    let node = this.top
    // to prevent infinite loop for 
    while (node !== null) {
      console.log(node)
      node = node.next
    }
  }

  remove(item) {
    // If the list is empty
    if (!this.top) {
      return null;
    }
    // If the node to be removed is top, make the next node head
    if (this.top.data === item) {
      this.top = this.top.next;
      return;
    }
    // Start at the top
    let currNode = this.top;
    // Keep track of previous
    let previousNode = this.top;

    while ((currNode !== null) && (currNode.data !== item)) {
      // Save the previous node 
      // so remember: previousNode equals the old data of currNode
      // and now the new dataof currNode is currNode.next, which is not what previousNode is equal to because of where and when it was assigned
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  
}
//Create a stack called starTrek and add Kirk, Spock, McCoy, and Scotty to the stack.
const starTrek = new Stack()
starTrek.push("Kirk")
starTrek.push("Spock")
starTrek.push("McCoy")
starTrek.push("Scotty")
/*Using the Stack class above, implement the following helper functions outside of the class:
peek(): allows you to look at the top of the stack without removing it
isEmpty(): allows you to check if the stack is empty or not
display(): to display the stack - what is the 1st item in your stack?
//starTrek.peek() // top of stack is Kirk, and it was the first one put in.
Remove McCoy from your stack and display the stack */
starTrek.display();  // first item is Scotty
//starTrek.remove("McCoy")

// The following is an example of a queue. Rachael is the 1st item in the queue and Pris is the last item in the queue.
// Just like stacks, Queues can be implemented using singly linked list or a doubly linked list, where an item can be inserted only at the end of the list and items can be deleted only at the beginning of the list. 

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  // The code for the enqueue operation is implemented as follows:
  enqueue(data) {
    const node = new _Node(data);
    // only happens under null condition
    if (this.first === null) {
      this.first = node;
    }
    // Add to the end of the queue, because last equals something  
    if (this.last) {
      this.last.next = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }

  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    // basically overwrites the first node with the second 
    const node = this.first;
    this.first = this.first.next;
    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }
    return node.data
  }

}
//3
//Write an algorithm that uses a stack to determine whether a given input is palindrome or not.


function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  if (s.length < 3) {
    return false;
  }
  // Your code goes here
  const stringStack = new Stack()
  for (let i = 0; i < s.length; i++) {
    stringStack.push(s[i])
  }
  let reverseString = ""

  while (!stringStack.isEmpty()) {
    reverseString += stringStack.pop();
  }

  if (s === reverseString) {
    return true;
  } else {
    return false;
  }
}
 is_palindrome('pop pop pop');

// 4 A stack can be used to ensure that an arithmetic expression has balanced parentheses. Write a function that takes an arithmetic expression as an argument and returns true or false based on matching parenthesis. As a bonus provide a meaningful error message to the user as to what's missing. For example, you are missing a ( or missing a ")".

// For version 1, the parentheses you need to consider are ( and ). Finding a close parenthesis without an open parenthesis is an error (report the location of the close); reaching the end of the string while still "holding" an open parenthesis is also an error (report the location of the open).

// Extension exercise: Recognize 3 pairs of brackets: (), [], and {}. These must be correctly nested; "([)]" is incorrect, and should report an error at the ), stating that you were expecting a ] but found a ). If this is starting to look and sound very familiar, congratulations - you're beginning to write a simple language parser!
// Extension extension exercise: Also recognize 2 types of quote character: "" and ''. Inside quotes, brackets aren't counted at all - in fact, nothing is counted until you reach the corresponding close quote.

const fancyPantsParser = (expression) => {
  const mrPantalones = new Stack()
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (let char in expression) {
    if (expression[char] === "(" || expression[char] === "[" || expression[char] === "{") {
      mrPantalones.push({
        character: expression[char],
        index: char
      })
    }

    if (mrPantalones.isEmpty()) {
      if (expression[char] === ")") {
        console.log(`You are missing a '(' after character index ${char}`)
        return false;
      }
      if (expression[char] === "]") {
        console.log(`You are missing a '[' after character index ${char}`)
        return false;
      }
      if (expression[char] === "}") {
        console.log(`You are missing a '{' after character index ${char}`)
        return false;
      }
    }

    if (expression[char] === ")" || expression[char] === "]" || expression[char] === "}") {
      let priorChar = mrPantalones.pop();
      if (expression[char] !== map[priorChar.character]) {
        console.log(`Expecting a ${map[priorChar.character]} but received a ${expression[char]}`);
        return false;
      }
    }

  }
  if (mrPantalones.isEmpty()) {
    return true;
  }
  console.log(`Holding an open ${mrPantalones.top.data.character} after character index ${mrPantalones.top.data.index}`)
  return false;
}

fancyPantsParser("I am a super (duper poop[er{} scoope])r smarty pant([a]lones.");

// 5  Write a program to sort a stack such that the smallest items are on the top (in ascending order). You can use an additional stack, but you may not use any other data structure (such as an array, or linked list).
function sort(stack) {
  let s2 = new Stack()
  while (stack.top) {
    let temp = stack.pop()
    while (s2.top && s2.top.data < temp) { // doesn't run first time around, bc nothing till after s2.push below
      stack.push(s2.pop())
    }
    s2.push(temp)
  }
  return s2.display(s2); // change to this.head as arg since method 
}
let sortedStack = new Stack()
sortedStack.push(8)
sortedStack.push(3)
sortedStack.push(16)
sortedStack.push(7)
sortedStack.push(1)

sort(sortedStack)

//6 Create queue called starTrekQ and add Kirk, Spock, Uhura, Sulu, and Checkov to the queue.Implement a peek() function outside of the Queue class that lets you take a peek at what the 1st item in the queue is.Implement a isEmpty() function outside the Queue class that allows you to check if the queue is empty or not Implement a display() function outside of the Queue class that lets you display what's in the queue.Remove Spock from the queue and display the resulting queue.

const starTrekQ = new Queue();

starTrekQ.enqueue("Kirk")
starTrekQ.enqueue("Spock")
starTrekQ.enqueue("Uhura")
starTrekQ.enqueue("Sulu")
starTrekQ.enqueue("Checkov")
// console.log(starTrekQ)
function peek(queue) {
  let node = queue.first.data
  if (node.next === undefined) {
    node = node
  }
  return node
}
// peek(starTrekQ)
function isEmpty(queue) {
  if (queue.first) {
    return false;
  } else {
    return true;
  }
}
// isEmpty(starTrekQ)
function display(queue) {
  let node = queue.first
  while (node.next !== null) {
    console.log(node)
    node = node.next
  }
}

// display(starTrekQ)

function remove(queue, item) {
  let node = queue.first
  // If the list is empty
  if (!node) {
    return null;
  }
  // If the node to be removed is top, make the next node head
  if (node.data === item) {
    node = node.next;
    return;
  }
  // Start at the top
  let currNode = queue.first;
  // Keep track of previous
  let previousNode = queue.first;

  while ((currNode !== null) && (currNode.data !== item)) {
    // Save the previous node 
    // so remember: previousNode equals the old data of currNode
    // and now the new dataof currNode is currNode.next, which is not what previousNode is equal to because of where and when it was assigned
    previousNode = currNode;
    currNode = currNode.next;
  }
  if (currNode === null) {
    console.log('Item not found');
    return;
  }
  previousNode.next = currNode.next;
}

// remove(starTrekQ, "Spock")
// display(starTrekQ)

// 7. Create a queue class using Doubly linked List
// Use the items listed in #6 and enqueue them to your queue.

// Check to see who is first one on the Queue?
class NodeDeque {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev
    this.next = next;
  }
}

class Doubly {
  constructor() {
    this.first = null;
    this.last = null;
  }

  // The code for the enqueue operation is implemented as follows:
  enqueue(data) {
    const node = new NodeDeque(data);
    // only happens under null condition
    if (this.first === null) {
      this.first = node;

    }
    // Add to the end of the queue, because last equals something  
    if (this.last) {
      this.last.next = node;
      this.last.prev = this.last
    }
    //make the new node the last item on the queue
    this.last = node;
  }
}

const starTrekDQ = new Doubly
starTrekDQ.enqueue("Kirk")
starTrekDQ.enqueue("Spock")
starTrekDQ.enqueue("Uhura")
starTrekDQ.enqueue("Sulu")
starTrekDQ.enqueue("Checkov")

// display(starTrekDQ)
