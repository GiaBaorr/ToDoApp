
//Function xử lý html
export default function html([first,...strings],...values){  //first là chuỗi đầu, strings là các chuỗi còn lại, values là các biến trong tagged template
    return values.reduce(
        (acc,curr) =>acc.concat(curr, strings.shift()),      //first gắn vào acc nối với các values đã được lọc, nối với strings còn lại
        [first]
    )
    .filter(x => x && x!==true || x===0)         // 1. lấy các giá trị truthy trừ tk true,  ko lấy các tk falsy trừ tk 0 
                                                // kết luận => lấy các truthy và 0 , trừ tk 'true'
    .join('');  //xử lý dấu ','
}

//========================STORE====================
export function createStore(reducer){     //xem lại mô hình redux, CreateStore nhận lại quá trình xử lý của reducer xong đưa vào store
    let state = reducer()  //reducer xử lý, return giá trị, đưa vào store // lần đầu ko có action, nen reducer trả vè giá trị init
    const roots = new Map() // là 1 obj đặc biệt, có khả năng lọc qua, key có thể là các loại dữ liệu như obj,function

    function render() {
        for (const [root,component] of roots) {  // do roots là dạng map, lọc qua được, root bên html lấy từ DOM là obj
            const output = component()  // component là function, return lại html
            root.innerHTML = output     // từng key root trong roots tương ứng với component đã return
        }
    }
    //các phương thức để làm việc với store
    return {
        attach(component,root){          //component là thành phần muốn đưa vào, root là selected từ DOM
            roots.set(root, component)   //roots là obj, set root là key, component là value
            render()
        },
        connect(selector = state => state){  //đưa từ store ra view
            //selector để lựa chọn khu vực để render ra view, mặc định chọn state
            return component => (props,...args) =>   //return hàm component , hàm component  nhận(prop,args) xử lý xong lại return
                component(Object.assign({}, props, selector(state), ...args))  //tạo ra obj rỗng đẩy props vào , đẩy state từ selector vào, đẩy args vào 
        },
        dispatch(action,...args){
            state = reducer(state, action, args)  // reducer nhận action và sửa state => update store // state lúc này đã thay đổi
            render() //store => render
        } 
    }
}