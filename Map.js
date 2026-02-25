let arr = [1, 1, 1, 1, 1, 1, 1, 44, 444, 444, 44, 4, 4, 6, 6, 6, 2]

let map = new Map()

for (let num of arr) {

    map.set(num, (map.get(num) || 0) + 1)

}
for (let [key, value] of map) {
    console.log("key is : " + key + " freq is : " + value)
}

console.log("the map is  : ", map)


