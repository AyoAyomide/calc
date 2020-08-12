Vue.component("btc-body", {
  props: {
    value: "",
  },
  template: `<div class="btc-wrap">
    <p>Rate Converter</p>
    <div class="right-wrap">
    <p>Bitcoin</p>
    <input 
    v-bind:value="this.$parent.convert2btc"
    v-on:input="updateBtc({type : 'Dollar',value : $event.target.value})"
    placeholder="Enter Bitcoin"
    ><br>
    <div class="calculate-wrap"><button></button><p>Calculate</p></div>
    <p>Usd</p>
    <input
    class="usd"
    v-bind:value="this.$parent.convert2dollar"
    v-on:input="updateBtc({type : 'Bitcoin',value : $event.target.value})"
    placeholder="Enter Usd"
    ></div>
    <p>we will pay : {{this.$parent.convert2dollar * this.$parent.companyRate}} naira</p>
    </div>
    `,
  methods: {
    updateBtc: function (event) {
      let inpValue = parseInt(event.value);
      if (inpValue) {
        if (event.type == "Bitcoin") {
          this.$emit("update-btc", { type: "Bitcoin", value: inpValue });
        } else if (event.type == "Dollar") {
          this.$emit("update-dol", { type: "Dollar", value: inpValue });
        }
      }
    },
  },
});
