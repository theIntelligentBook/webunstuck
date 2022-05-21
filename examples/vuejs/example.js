
Vue.component('lifecell', {
    props: ['lifecell'],
    template: '<span>{{ lifecell ? "#" : "_" }}</span>'
})

Vue.component('lifeline', {
    props: ['lifeline'],
    template: '<span><lifecell v-for="l in lifeline" v-bind:lifecell="l"></lifecell></span>'
})

Vue.component('lifegrid', {
    props: ['lifegrid'],
    template: '<div><div v-for="l in lifegrid"><lifeline v-bind:lifeline="l"></lifeline></div></div>'
})

var game = {
    moves: 0,
    lifegrid: window.getGrid()
}


var gameStep = function() {
    game.moves = game.moves + 1;
    game.lifegrid = window.step();
}

new Vue({
    el: '#app',
    data: game
  })