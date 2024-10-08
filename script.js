    const mainTodoElem = document.querySelector(".todo-lists-elem");
      const inputValues = document.getElementById("inputValues");  
      
     


      // now show data in list from local storage -> create fn and get item
      const getTodoListFromLocal = () => {
        return JSON.parse(localStorage.getItem("youtube"));
      };

        const addTodoListLocalStorage = (localTodoLists) => {
          return localStorage.setItem("youtube" , JSON.stringify(localTodoLists))
        };

      let localTodoLists = getTodoListFromLocal() || [];


      //  adding add to list dynamically
      const addTodoDynamicElement = (curElem) => {
        console.log('Current Element:', curElem); 
         // ---- create div element-----
         const divElement = document.createElement("div");
        //  add class   in div element
        divElement.classList.add("main_todo_div");
        // enter data in element---
        divElement.innerHTML = `<li> ${curElem}</li>  <button class="deleteBtn">Delete</button>`;
        // append the divelem in main to do list
        mainTodoElem.append(divElement);      
      }

       const addTodoList = (e) => {
        e.preventDefault();
       
        // trim fn use for removing empty spce in value and store data in variable
        const todoListValue = inputValues.value.trim();
        
        inputValues.value = "";

        if(todoListValue!=="" && !localTodoLists.includes(todoListValue)) {
        localTodoLists.push(todoListValue);
        localTodoLists = [...new Set(localTodoLists)];
        console.log(localTodoLists);
          
        //  save data to local storage from object to string using JSON Stringify 
        localStorage.setItem(
          "youtube" , JSON.stringify(localTodoLists)
      );
        
        
        addTodoDynamicElement(todoListValue);

        }
        
      };
      
      const showTodoList = () => {
        console.log(localTodoLists);

        localTodoLists.forEach((curElem) => { 
          addTodoDynamicElement(curElem);
          
        })
      };
        
      showTodoList();

      //remove the data 
      const removeTodoElem = (e) => {
         const todoToRemove = e.target;
         let todoListContent  = todoToRemove.previousElementSibling.innerText;
         let parentElem = todoToRemove.parentElement;
         console.log(todoListContent);

          localTodoLists  = localTodoLists.filter((curTodo) => {
          return curTodo != todoListContent.toLowerCase();
         });

         addTodoListLocalStorage(localTodoLists);
         
         parentElem.remove();

         console.log(localTodoLists);
        };


      document.querySelector('.btn1').addEventListener("click", (e) => {
        addTodoList(e);
      });

      // event to remove the data
      mainTodoElem.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.classList.contains("deleteBtn")) {
        removeTodoElem(e);
        }
      }
    );
