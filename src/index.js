var isOpen = false;
var myName = 'Mike';
var myAge = 21;
var list = [0, 1, 2];
var me = ['Mike', 21, false];
var Job;
(function (Job) {
    Job[Job["webDev"] = 0] = "webDev";
    Job[Job["WebDesigner"] = 1] = "WebDesigner";
    Job[Job["PM"] = 2] = "PM";
})(Job || (Job = {}));
var job = Job.webDev;
var phone = 'Pixel';
var tablet = 3;
var sayWord = function (word) {
    if (word === void 0) { word = 'Hello'; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    console.log(word);
    return word;
};
sayWord('Mike', 's');
var makeMargin = function (x) {
    return "margin: " + x + "px";
};
var dog;
dog = null;
dog = 'Luna';
var sayName = function (_a) {
    var name = _a.name, age = _a.age;
    console.log(name);
    return name;
};
sayName({ name: 'Mike', age: 21 });
sayName({ age: 21, name: 'Mike' });
var Type;
(function (Type) {
    Type["Video"] = "VIDEO";
    Type["BlogPost"] = "BLOG_POST";
    Type["Quiz"] = "QUIZ";
})(Type || (Type = {}));
var createContent = function (contentType) { };
createContent(Type.Video);
console.log('Type Quiz', Type.Quiz);
var Team = (function () {
    function Team(teamName) {
        this.teamName = teamName;
    }
    Team.prototype.score = function () {
        console.log('goal');
    };
    return Team;
}());
var redWings = new Team('Red Wings');
redWings.score();
redWings.teamName;
var outputInput = function (arg) {
    return arg;
};
var Dancer = (function () {
    function Dancer() {
    }
    return Dancer;
}());
var aDancer = new Dancer();
var fake = {
    name: 'Mike',
    age: 21
};
aDancer = fake;
