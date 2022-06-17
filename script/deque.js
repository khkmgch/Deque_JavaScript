//両端キュー
class Deque{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    //リストの先頭のデータを返す。O(1)
    peekFront(){
        if(this.head == null) return null;
        return this.head.data;
    }
    //リストの末尾のデータを返す。O(1)
    peekBack(){
        if(this.tail == null) return this.peekFront();
        return this.tail.data;
    }
    //リストの先頭に挿入。O(1)
    enqueueFront(newNode){
        if(this.head == null){
            this.head = newNode;
            this.tail = this.head;
        }
        else{
            let node = newNode;
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    }
    //リストの末尾に挿入。O(1)
    enqueueBack(newNode){
        if(this.head == null){
            this.head = newNode;
            this.tail = this.head;
        }
        else{
            let node = newNode;
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    }
    //リストの先頭を削除し、削除した要素のデータを返す。O(1)
    dequeueFront(){
        if(this.head == null) return null;

        let temp = this.head;
        this.head = this.head.next;
        if(this.head != null) this.head.prev = null;
        else this.tail = null;
        return temp.data;
    }
    //リストの末尾を削除し、削除した要素のデータを返す。O(1)
    dequeueBack(){
        if(this.tail == null) return null;

        let temp = this.tail;
        this.tail = this.tail.prev;

        //update the tail
        if(this.tail != null) this.tail.next = null;
        else this.head = null;
        return temp.data;
    }
    //index番目の要素を返す。O(n)
    at(index){
        let iterator = this.head;
        // 片方向リストと同じ処理
        for(let i = 0; i < index; i++){
            iterator = iterator.next;
            if(iterator == null) return null;
        }

        return iterator;
    }
    //idで要素を探す
    findById(id){
        let iterator = this.head;
        while(iterator != null){
            if(iterator.data.id == id){
                return iterator;
            }
            iterator = iterator.next;
        }
        return null;
    }
    //受け取った要素(node)の次にnewNodeを追加する。O(1)
    addNextNode(node, newNode){
        let tempNode = node.next;
        node.next = newNode;
        newNode.next = tempNode;
        newNode.prev = node;

        // もし与えられたノードが末尾なら、その後ろに新しいノードが追加されるので、末尾をアップデート。
        // それ以外の場合は、tempNodeの前をnewNodeに設定。
        if(node === this.tail) this.tail = newNode;
        else tempNode.prev = newNode;
    }
    //受け取った要素(node)をO(1)で削除する。
    deleteNode(node){
        if(node === this.tail) return this.dequeueBack();
        if(node === this.head) return this.dequeueFront();

        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    //リストを逆順にする。O(n)
    reverse(){
        let reverse = this.tail;
        let iterator = this.tail.prev;

        let currentNode = reverse;
        while(iterator != null){
            currentNode.next = iterator;

            iterator = iterator.prev;
            if(iterator != null) iterator.next = null;

            currentNode.next.prev = currentNode;
            currentNode = currentNode.next;
        }

        this.tail = currentNode;
        this.head = reverse;
        this.head.prev = null;
    }
    //リストを表示する。O(n)
    printList(){
        let iterator = this.head;
        let str = "";
        while(iterator != null){
            str += iterator.data + " ";
            iterator = iterator.next;
        }  
        console.log(str)
    }
    //リストを逆順に表示する。O(n)
    printInReverse(){
        let iterator = this.tail;
        let str = "";
        while(iterator != null){
            str += iterator.data + " ";
            iterator = iterator.prev;
        }
        console.log(str)
    }
}
