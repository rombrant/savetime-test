import axios from "axios"

export default {
    namespaced: true,
    state: {
      data: []
    },
    mutations: {
        SET_DATA: (state, data) => {
            state.data = data;
          }
    },
    actions: {
        async fetchData({ commit }, searching) {
            try {
              const response = await axios.get(`http://sgs.sputnik.ru/?type=regions&format=json&query=${searching}`);
              var arr = response.data.split("header");
              const curData = arr.filter(item=>  item.toLowerCase().indexOf(searching.toLowerCase()) !== -1);
                var reArr = new Array;
                for (var i=0; curData.length>i; i++) {
                    var str= curData[i].substr(3, curData[i].length - 135);
                    reArr.push(str.replace(searching, `<span style="color:red;">`+searching+`</span>`));
                }
              commit("SET_DATA", reArr);
              return response;
            } catch (error) {
              // error handling
            }
          },
      }
  };