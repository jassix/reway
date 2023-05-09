# 🌐 reway
<br/>[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/jassix)
##### 💨 Flexible framework-agnostic state-manager.

---

#### Motivation

The main advantages and directions for the development of **reway** are:

- convenience
- speed
- code reuse, regardless of the framework

---

#### Documentation

1. **Install** library from npm

    ```bash
    yarn add @reway/core
    ```

    If you want to use more convenient tools for your framework, you can install additional packages **(OPTIONAL)**
    <br/>P.S: Already we support only React.

    ```bash
    yarn add @reway/<framework-name>
    ```

2. **Write** a simple case:

    ```ts
    import { atom } from "@reway/core";
   
    type ExampleStore = {
      hello: string;
    }
    
    const example = atom<ExampleStore>({
      hello: "me"
    })
    ```

3. **Listen** any actions

    ```ts
    // You can listen for global changes in your atom by replacing "hello" (in the example above) with "data"
    
    example.on("hello", (state) => {
      console.log("Hello is changed!")
    })
    ```

4. **Change** data in atom

    ```ts
    example.set({
      hello: "not me"
    })
    ```

5. **Get** data

    ```ts
    example.get()
    
    // You can also choose the line you want to get
    
    example.get({
      hello: true
    })
    ```

6. **Start** using it in your project, and then share your opinion with us!

---

#### Advanced features

- combine
    ```ts
    import {combine, atom} from "@reway/core";
  
    const likes = atom<number>(0);
    const name = atom<string>("hello");
		
    // The first parameter to the combine function is an array of keys for your values (optional).
    // The second parameter is the atoms.
    const post = combine(['likes', 'name'], likes, name) // The result is a default atom
  
    /*
      {
        likes: 0,
        name: "hello"
      }
    */
    console.log(post.get())
  
    likes.set(100)
    name.set("News")
  
    /*
      {
        likes: 100,
        name: "News"
      }
    */
    console.log(post.get())
  ```

#### TODO

- Support for plugins (persists, etc.)

---

#### Contribution

The library needs your activity! We welcome any help.