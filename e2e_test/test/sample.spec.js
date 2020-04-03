describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      //await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('React App');
    })

    it('render all item', async function(){
        let todoList = await page.waitFor('#todoList');
        
        const flag = await page.evaluate(function(todoList){
          if(todoList.childNodes.item(0).textContent == 'React practice' && todoList.childNodes.item(1).textContent == 'game time'){
            return true;
          }else{
            return false;
          }
        }, todoList);
        expect(flag).to.eql(true);
    })

    it('test add', async function(){
      await page.type('#newItemText','testContext',{dalay:500});
      await page.click('#addItem',{delay:500});
      let todoList = await page.waitFor('#todoList');
      let realText = await page.evaluate(function(todoList){
        return todoList.lastChild.textContent;
      },todoList);
      expect(realText).to.eql('testContext');
    })

    it('do it', async function(){
      await page.click('#testContext', {delay:500});
      let todoList = await page.waitFor('#todoList');
      const realStatus = await page.evaluate(function(todoList){
        return todoList.lastChild.className;
      },todoList)
      expect(realStatus).to.eql('done-item');
    })

    it('undo it', async function(){
      await page.click('#testContext', {delay:500});
      let todoList = await page.waitFor('#todoList');
      const realStatus = await page.evaluate(function(todoList){
        return todoList.lastChild.className;
      },todoList)
      expect(realStatus).to.eql('item');
    })


    // it('should new todo correct', async function() {
    //   await page.click('#new-todo', {delay: 500});
    //   await page.type('#new-todo', 'new todo item', {delay: 50});
    //   await page.keyboard.press("Enter");
    //   let todoList = await page.waitFor('#todo-list');
    //   const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
    //   expect(expectInputContent).to.eql('new todo item');
    // }) 

    // it('should delete the new todo item', async function(){
    //   //page.click('#todo-list > li > div > input',{delay:500});
    //   //page.click('#todo-list > li > div > button',{delay:500});
    //   let todoList = await page.waitFor('#todo-list');
    //   const expectInputContent = await page.evaluate(todoList => {
    //     let test = todoList.lastChild.querySelector('button');
    //     page.click()
    //   }, todoList);
    //   //console.log(expectInputContent);
    //   //page.click(expectInputContent,{delay:500});
    //   expect(expectInputContent).to.eql({});
    //   // await page.evaluate((todoList) =>{

    //   // },todoList);
    // })
  });
