Vue.component("gfc-body", {
  template: `<div>
            <input placeholder="enter to search">
            <gfc-cards ></gfc-cards>
            <select-item options="country"></select-item>
            <select-item></select-item>
            <input placeholder="enter amount">
        </div>
        `,
});
Vue.component("gfc-cards", {
  props: {
    title: "",
  },
  data: function () {
    return {
      giftCards: [
        { title: "itunes" },
        { title: "amazon" },
        { title: "playstore" },
      ],
    };
  },
  template: `<div>
            <div 
            v-for="(cards,index) in giftCards"
            v-bind:key="cards.index"
            v-bind:title="cards.title"
            >
                <input 
                type="radio" name="card"
                v-bind:value="cards.title"
                v-on:change="getChange($event.target.value)">
                <label>{{cards.title}}</label>
            </div>
        </div>
        `,
  methods: {
    getChange: function (event) {
      console.log("hello", event);
    },
  },
});
Vue.component("select-item", {
  props: ["options"],
  data: function () {
    if (this.options == "country") {
      return {
        item: {
          selected: "Usa",
          names: ["Usa", "China", "Uk", "canada"],
        },
      };
    } else {
      return {
        item: {
          selected: "",
          names: ["Type 1", "Type2", "Type3"],
        },
      };
    }
  },
  template: `<div>
        <select v-on:change="itemSelected($event.target.value)">
          <option 
          v-for="(items,index) in item.names"
          v-bind:value="items"
          >
          {{items}}
          </option>
        </select>
               </div>
      `,
  methods: {
    itemSelected: function (event) {
      console.log(event);
    },
  },
});
