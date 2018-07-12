(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var message = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + message);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel);
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2, result.a);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail(elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail(elm$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send(elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!elm$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if (elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2(elm$http$Http$BadPayload, result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = elm$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2(elm$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return elm$http$Http$Internal$FormDataBody(formData);
}



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^\s*javascript:/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^\s*javascript:/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}



// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var key = {};
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	return _Browser_document({
		setup: function(sendToApp)
		{
			function reportChange()
			{
				sendToApp(onUrlChange(_Browser_getUrl()));
			}

			key.a = reportChange;

			_Browser_window.addEventListener('popstate', reportChange);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', reportChange);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key.a();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key.a();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key.a();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	var node = _Browser_doc.documentElement;
	return {
		scene: {
			width: node.scrollWidth,
			height: node.scrollHeight
		},
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: node.clientWidth,
			height: node.clientHeight
		}
	};
}


var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: x,
				y: y,
				width: node.clientWidth,
				height: node.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var author$project$Document$Document = function (id) {
	return function (identifier) {
		return function (authorId) {
			return function (authorIdentifier) {
				return function (authorName) {
					return function (title) {
						return function (content) {
							return function (level) {
								return function (_public) {
									return function (access) {
										return function (tags) {
											return function (children) {
												return function (parentId) {
													return function (parentTitle) {
														return function (textType) {
															return function (docType) {
																return function (archive) {
																	return function (version) {
																		return function (lastViewed) {
																			return function (created) {
																				return function (modified) {
																					return {access: access, archive: archive, authorId: authorId, authorIdentifier: authorIdentifier, authorName: authorName, children: children, content: content, created: created, docType: docType, id: id, identifier: identifier, lastViewed: lastViewed, level: level, modified: modified, parentId: parentId, parentTitle: parentTitle, _public: _public, tags: tags, textType: textType, title: title, version: version};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var author$project$Document$MiniLatex = {$: 'MiniLatex'};
var author$project$Document$Standard = {$: 'Standard'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var author$project$Document$basicDocument = author$project$Document$Document(0)('basicDocument123')(0)('author123')('Phineas Phud')('Welcome!')('Pythagoras said: $a^2 + b^2 = c^2$.')(1)(true)(elm$core$Dict$empty)(_List_Nil)(_List_Nil)(0)('Parent')(author$project$Document$MiniLatex)(author$project$Document$Standard)('default')(0)(
	elm$time$Time$millisToPosix(0))(
	elm$time$Time$millisToPosix(0))(
	elm$time$Time$millisToPosix(0));
var author$project$DocumentDictionary$DocumentDictionary = function (a) {
	return {$: 'DocumentDictionary', a: a};
};
var author$project$DocumentDictionary$empty = author$project$DocumentDictionary$DocumentDictionary(elm$core$Dict$empty);
var author$project$DocumentList$DocumentList = function (a) {
	return {$: 'DocumentList', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var author$project$DocumentList$empty = author$project$DocumentList$DocumentList(
	{documents: _List_Nil, selected: elm$core$Maybe$Nothing});
var elm$core$Basics$False = {$: 'False'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = function (flags) {
	var doc = author$project$Document$basicDocument;
	return _Utils_Tuple2(
		{
			counter: 0,
			currentDocument: _Utils_update(
				doc,
				{title: 'Welcome!'}),
			docInfo: '',
			documentDictionary: author$project$DocumentDictionary$empty,
			documentList: author$project$DocumentList$empty,
			maybeCurrentUser: elm$core$Maybe$Nothing,
			maybeToken: elm$core$Maybe$Nothing,
			message: 'App started',
			password: ''
		},
		elm$core$Platform$Cmd$none);
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Main$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var author$project$Document$ReceiveDocument = function (a) {
	return {$: 'ReceiveDocument', a: a};
};
var author$project$Configuration$backend = 'http://localhost:4000';
var elm$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Document$DocumentRecord = function (document) {
	return {document: document};
};
var author$project$Document$Child = F5(
	function (title, docId, docIdentifier, level, comment) {
		return {comment: comment, docId: docId, docIdentifier: docIdentifier, level: level, title: title};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Document$decodeChild = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'comment',
	elm$json$Json$Decode$string,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'doc_id',
		elm$json$Json$Decode$int,
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'doc_identifier',
			elm$json$Json$Decode$string,
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'level',
				elm$json$Json$Decode$int,
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'title',
					elm$json$Json$Decode$string,
					elm$json$Json$Decode$succeed(author$project$Document$Child))))));
var author$project$Document$Master = {$: 'Master'};
var elm$core$Basics$append = _Utils_append;
var elm$json$Json$Decode$fail = _Json_fail;
var author$project$Document$decodeDocType = function (docTypeString) {
	switch (docTypeString) {
		case 'standard':
			return elm$json$Json$Decode$succeed(author$project$Document$Standard);
		case 'master':
			return elm$json$Json$Decode$succeed(author$project$Document$Master);
		default:
			return elm$json$Json$Decode$fail('I don\'t know a docType named ' + docTypeString);
	}
};
var author$project$Document$Asciidoc = {$: 'Asciidoc'};
var author$project$Document$AsciidocLatex = {$: 'AsciidocLatex'};
var author$project$Document$Markdown = {$: 'Markdown'};
var author$project$Document$decodeTextType = function (textTypeString) {
	switch (textTypeString) {
		case 'adoc':
			return elm$json$Json$Decode$succeed(author$project$Document$Asciidoc);
		case 'adoc_latex':
			return elm$json$Json$Decode$succeed(author$project$Document$AsciidocLatex);
		case 'plain':
			return elm$json$Json$Decode$succeed(author$project$Document$Asciidoc);
		case 'latex':
			return elm$json$Json$Decode$succeed(author$project$Document$MiniLatex);
		case 'markdown':
			return elm$json$Json$Decode$succeed(author$project$Document$Markdown);
		default:
			return elm$json$Json$Decode$fail('I don\'t know a textType named ' + textTypeString);
	}
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		elm$json$Json$Decode$map,
		elm$core$Dict$fromList,
		elm$json$Json$Decode$keyValuePairs(decoder));
};
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Document$documentDecoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'lastModified',
	A2(elm$json$Json$Decode$map, elm$time$Time$millisToPosix, elm$json$Json$Decode$int),
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'created',
		A2(elm$json$Json$Decode$map, elm$time$Time$millisToPosix, elm$json$Json$Decode$int),
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'lastViewed',
			A2(elm$json$Json$Decode$map, elm$time$Time$millisToPosix, elm$json$Json$Decode$int),
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'version',
				elm$json$Json$Decode$int,
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'archive',
					elm$json$Json$Decode$string,
					A3(
						NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
						'docType',
						A2(elm$json$Json$Decode$andThen, author$project$Document$decodeDocType, elm$json$Json$Decode$string),
						A3(
							NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
							'textType',
							A2(elm$json$Json$Decode$andThen, author$project$Document$decodeTextType, elm$json$Json$Decode$string),
							A3(
								NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
								'parentTitle',
								elm$json$Json$Decode$string,
								A3(
									NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
									'parentId',
									elm$json$Json$Decode$int,
									A3(
										NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
										'children',
										elm$json$Json$Decode$list(author$project$Document$decodeChild),
										A3(
											NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
											'tags',
											elm$json$Json$Decode$list(elm$json$Json$Decode$string),
											A3(
												NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
												'access',
												elm$json$Json$Decode$dict(elm$json$Json$Decode$string),
												A3(
													NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
													'public',
													elm$json$Json$Decode$bool,
													A3(
														NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
														'level',
														elm$json$Json$Decode$int,
														A3(
															NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
															'content',
															elm$json$Json$Decode$string,
															A3(
																NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
																'title',
																elm$json$Json$Decode$string,
																A3(
																	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
																	'authorName',
																	elm$json$Json$Decode$string,
																	A3(
																		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
																		'authorIdentifier',
																		elm$json$Json$Decode$string,
																		A3(
																			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
																			'authorId',
																			elm$json$Json$Decode$int,
																			A3(
																				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
																				'identifier',
																				elm$json$Json$Decode$string,
																				A3(
																					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
																					'id',
																					elm$json$Json$Decode$int,
																					elm$json$Json$Decode$succeed(author$project$Document$Document))))))))))))))))))))));
var author$project$Document$documentRecordDecoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'document',
	author$project$Document$documentDecoder,
	elm$json$Json$Decode$succeed(author$project$Document$DocumentRecord));
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$http$Http$expectJson = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.body);
			if (_n0.$ === 'Err') {
				var decodeError = _n0.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm$core$Result$Ok(value);
			}
		});
};
var elm$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Internal$Header;
var elm$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 'StringBody', a: a, b: b};
	});
var elm$http$Http$jsonBody = function (value) {
	return A2(
		elm$http$Http$Internal$StringBody,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
var elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$http$Http$request = elm$http$Http$Internal$Request;
var elm$json$Json$Encode$null = _Json_encodeNull;
var author$project$Document$getDocumentByIdRequest = F2(
	function (id, maybeTokenString) {
		var _n0 = function () {
			if (maybeTokenString.$ === 'Nothing') {
				return _Utils_Tuple2(
					'/api/public/documents/' + elm$core$String$fromInt(id),
					_List_fromArray(
						[
							A2(elm$http$Http$header, 'APIVersion', 'V2')
						]));
			} else {
				var tokenString = maybeTokenString.a;
				return _Utils_Tuple2(
					'/api/documents/' + elm$core$String$fromInt(id),
					_List_fromArray(
						[
							A2(elm$http$Http$header, 'APIVersion', 'V2'),
							A2(elm$http$Http$header, 'Authorization', 'Bearer ' + tokenString)
						]));
			}
		}();
		var route = _n0.a;
		var headers = _n0.b;
		return elm$http$Http$request(
			{
				body: elm$http$Http$jsonBody(elm$json$Json$Encode$null),
				expect: elm$http$Http$expectJson(author$project$Document$documentRecordDecoder),
				headers: headers,
				method: 'Get',
				timeout: elm$core$Maybe$Just(5000),
				url: _Utils_ap(author$project$Configuration$backend, route),
				withCredentials: false
			});
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(
					elm$core$Task$onError,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Err),
					A2(
						elm$core$Task$andThen,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
							elm$core$Result$Ok),
						task))));
	});
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0.a;
	return A2(_Http_toTask, request_, elm$core$Maybe$Nothing);
};
var elm$http$Http$send = F2(
	function (resultToMessage, request_) {
		return A2(
			elm$core$Task$attempt,
			resultToMessage,
			elm$http$Http$toTask(request_));
	});
var author$project$Document$getDocumentById = F2(
	function (id, maybeTokenString) {
		return A2(
			elm$http$Http$send,
			author$project$Document$ReceiveDocument,
			A2(author$project$Document$getDocumentByIdRequest, id, maybeTokenString));
	});
var author$project$DocumentDictionary$matchId = F3(
	function (id, key, _n0) {
		var dict = _n0.a;
		var maybeDocument = A2(elm$core$Dict$get, key, dict);
		if (maybeDocument.$ === 'Nothing') {
			return false;
		} else {
			var doc = maybeDocument.a;
			return _Utils_eq(doc.id, id);
		}
	});
var author$project$DocumentDictionary$PutDocumentInDictionaryAsTexMacros = function (a) {
	return {$: 'PutDocumentInDictionaryAsTexMacros', a: a};
};
var author$project$DocumentDictionary$putTexMacroDocumentInDictionaryById = F2(
	function (id, maybeTokenString) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentDictionary$PutDocumentInDictionaryAsTexMacros,
			A2(author$project$Document$getDocumentByIdRequest, id, maybeTokenString));
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$String$startsWith = _String_startsWith;
var author$project$Utility$findTag = F2(
	function (tagFragment, tagList) {
		return elm$core$List$head(
			A2(
				elm$core$List$filter,
				function (x) {
					return A2(elm$core$String$startsWith, tagFragment + ':', x);
				},
				tagList));
	});
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var author$project$Utility$lookUpKeyInTagList = F2(
	function (key, tagList) {
		var _n0 = A2(author$project$Utility$findTag, key, tagList);
		if (_n0.$ === 'Nothing') {
			return elm$core$Maybe$Nothing;
		} else {
			var str = _n0.a;
			return elm$core$List$head(
				A2(
					elm$core$List$drop,
					1,
					A2(elm$core$String$split, ':', str)));
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$String$toInt = _String_toInt;
var author$project$DocumentDictionary$loadTexMacros = F4(
	function (maybeTokenString, document, tagList, documentDictionary) {
		var maybeTexMacroIdString = A2(author$project$Utility$lookUpKeyInTagList, 'texmacros', tagList);
		var _n0 = function () {
			if (maybeTexMacroIdString.$ === 'Nothing') {
				return _Utils_Tuple2(false, 0);
			} else {
				var idString = maybeTexMacroIdString.a;
				var id_ = A2(
					elm$core$Maybe$withDefault,
					0,
					elm$core$String$toInt(idString));
				var matches = A3(author$project$DocumentDictionary$matchId, id_, 'texmacros', documentDictionary);
				return _Utils_Tuple2(matches, id_);
			}
		}();
		var texMacrosPresent = _n0.a;
		var id = _n0.b;
		var _n2 = _Utils_Tuple2(texMacrosPresent, id);
		if (!_n2.a) {
			var id_ = _n2.b;
			return A2(author$project$DocumentDictionary$putTexMacroDocumentInDictionaryById, id_, maybeTokenString);
		} else {
			var id_ = _n2.b;
			return A2(author$project$DocumentDictionary$putTexMacroDocumentInDictionaryById, id_, maybeTokenString);
		}
	});
var author$project$DocumentDictionary$put = F3(
	function (key, document, _n0) {
		var dict = _n0.a;
		return author$project$DocumentDictionary$DocumentDictionary(
			A3(elm$core$Dict$insert, key, document, dict));
	});
var author$project$DocumentList$documentListLength = function (_n0) {
	var documentList = _n0.a;
	return elm$core$List$length(documentList.documents);
};
var author$project$DocumentList$ReceiveDocumentList = function (a) {
	return {$: 'ReceiveDocumentList', a: a};
};
var author$project$DocumentList$DocumentListRecord = F2(
	function (documents, selected) {
		return {documents: documents, selected: selected};
	});
var author$project$DocumentList$listDocumentDecoder = A2(
	elm$json$Json$Decode$field,
	'documents',
	elm$json$Json$Decode$list(author$project$Document$documentDecoder));
var author$project$DocumentList$documentListRecordDecoder = A3(
	elm$json$Json$Decode$map2,
	author$project$DocumentList$DocumentListRecord,
	author$project$DocumentList$listDocumentDecoder,
	elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing));
var author$project$DocumentList$documentListDecoder = A2(elm$json$Json$Decode$map, author$project$DocumentList$DocumentList, author$project$DocumentList$documentListRecordDecoder);
var author$project$User$getTokenString = function (_n0) {
	var user = _n0.a;
	var _n1 = user.token;
	var str = _n1.a;
	return str;
};
var author$project$DocumentList$findDocumentsRequest = F2(
	function (maybeUser, queryString) {
		var _n0 = function () {
			if (maybeUser.$ === 'Nothing') {
				return _Utils_Tuple2(
					'/api/public/documents?' + queryString,
					_List_fromArray(
						[
							A2(elm$http$Http$header, 'APIVersion', 'V2')
						]));
			} else {
				var user = maybeUser.a;
				return _Utils_Tuple2(
					'/api/documents?' + queryString,
					_List_fromArray(
						[
							A2(elm$http$Http$header, 'APIVersion', 'V2'),
							A2(
							elm$http$Http$header,
							'authorization',
							'Bearer ' + author$project$User$getTokenString(user))
						]));
			}
		}();
		var route = _n0.a;
		var headers = _n0.b;
		return elm$http$Http$request(
			{
				body: elm$http$Http$jsonBody(elm$json$Json$Encode$null),
				expect: elm$http$Http$expectJson(author$project$DocumentList$documentListDecoder),
				headers: headers,
				method: 'Get',
				timeout: elm$core$Maybe$Just(5000),
				url: _Utils_ap(author$project$Configuration$backend, route),
				withCredentials: false
			});
	});
var author$project$DocumentList$findDocuments = F2(
	function (maybeUser, queryString) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$ReceiveDocumentList,
			A2(author$project$DocumentList$findDocumentsRequest, maybeUser, queryString));
	});
var elm$core$Debug$log = _Debug_log;
var author$project$DocumentList$loadMasterDocumentRequest = F2(
	function (maybeUser, docId) {
		var _n0 = function () {
			var _n1 = A2(elm$core$Debug$log, 'LD, maybeUser', maybeUser);
			if (_n1.$ === 'Nothing') {
				return _Utils_Tuple2(
					'/api/public/documents?master=' + elm$core$String$fromInt(docId),
					_List_fromArray(
						[
							A2(elm$http$Http$header, 'APIVersion', 'V2')
						]));
			} else {
				var user = _n1.a;
				return _Utils_Tuple2(
					'/api/documents?master=' + elm$core$String$fromInt(docId),
					_List_fromArray(
						[
							A2(elm$http$Http$header, 'APIVersion', 'V2'),
							A2(
							elm$http$Http$header,
							'authorization',
							'Bearer ' + author$project$User$getTokenString(user))
						]));
			}
		}();
		var route = _n0.a;
		var headers = _n0.b;
		return elm$http$Http$request(
			{
				body: elm$http$Http$jsonBody(elm$json$Json$Encode$null),
				expect: elm$http$Http$expectJson(author$project$DocumentList$documentListDecoder),
				headers: headers,
				method: 'Get',
				timeout: elm$core$Maybe$Just(5000),
				url: _Utils_ap(author$project$Configuration$backend, route),
				withCredentials: false
			});
	});
var author$project$DocumentList$loadMasterDocument = F2(
	function (maybeUser, docId) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$ReceiveDocumentList,
			A2(author$project$DocumentList$loadMasterDocumentRequest, maybeUser, docId));
	});
var author$project$DocumentList$ReceiveDocumentListAndPreserveCurrentSelection = function (a) {
	return {$: 'ReceiveDocumentListAndPreserveCurrentSelection', a: a};
};
var author$project$DocumentList$loadMasterDocumentWithCurrentSelection = F2(
	function (maybeUser, docId) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$ReceiveDocumentListAndPreserveCurrentSelection,
			A2(author$project$DocumentList$loadMasterDocumentRequest, maybeUser, docId));
	});
var author$project$DocumentList$select = F2(
	function (maybeSelectedDocument, _n0) {
		var documentList = _n0.a;
		return author$project$DocumentList$DocumentList(
			{documents: documentList.documents, selected: maybeSelectedDocument});
	});
var author$project$Main$DocDictMsg = function (a) {
	return {$: 'DocDictMsg', a: a};
};
var author$project$Main$DocListMsg = function (a) {
	return {$: 'DocListMsg', a: a};
};
var author$project$Main$DocMsg = function (a) {
	return {$: 'DocMsg', a: a};
};
var author$project$Main$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var author$project$Main$handleHttpError = function (error) {
	switch (error.$) {
		case 'BadUrl':
			var str = error.a;
			return str;
		case 'Timeout':
			return 'timeout';
		case 'NetworkError':
			return 'Network error';
		case 'BadStatus':
			var resp = error.a;
			return 'Bad status: ' + 'darn!';
		default:
			var str1 = error.a;
			var resp = error.b;
			return 'Bad payload: ' + (str1 + (', payload = ' + 'bad payload'));
	}
};
var author$project$Query$transformQualifiedItem = function (item) {
	var _n0 = A2(elm$core$String$split, ':', item);
	_n0$16:
	while (true) {
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			switch (_n0.a) {
				case 'k':
					var _n1 = _n0.b;
					var stem = _n1.a;
					return 'key=' + stem;
				case 't':
					var _n2 = _n0.b;
					var stem = _n2.a;
					return 'text=' + stem;
				case 'ti':
					var _n3 = _n0.b;
					var stem = _n3.a;
					return 'title=' + stem;
				case 'p':
					var _n4 = _n0.b;
					var stem = _n4.a;
					return 'public=' + stem;
				case 'a':
					var _n5 = _n0.b;
					var stem = _n5.a;
					return 'authorname=' + stem;
				case 'id':
					var _n6 = _n0.b;
					var stem = _n6.a;
					return 'id=' + stem;
				case 'ident':
					var _n7 = _n0.b;
					var stem = _n7.a;
					return 'ident=' + stem;
				case 'sort':
					switch (_n0.b.a) {
						case 'updated':
							var _n8 = _n0.b;
							return 'sort=updated';
						case 'u':
							var _n9 = _n0.b;
							return 'sort=updated';
						case 'created':
							var _n10 = _n0.b;
							return 'sort=created';
						case 'c':
							var _n11 = _n0.b;
							return 'sort=created';
						case 'title':
							var _n12 = _n0.b;
							return 'sort=title';
						case 't':
							var _n13 = _n0.b;
							return 'sort=title';
						case 'viewed':
							var _n14 = _n0.b;
							return 'sort=viewed';
						case 'v':
							var _n15 = _n0.b;
							return 'sort=viewed';
						default:
							break _n0$16;
					}
				case 'limit':
					var _n16 = _n0.b;
					var stem = _n16.a;
					return 'limit=' + stem;
				default:
					break _n0$16;
			}
		} else {
			break _n0$16;
		}
	}
	return '';
};
var elm$core$String$contains = _String_contains;
var author$project$Query$transformItem = function (item) {
	var _n0 = _Utils_Tuple2(
		A2(elm$core$String$contains, ':', item),
		A2(elm$core$String$contains, '=', item));
	if (_n0.a) {
		if (_n0.b) {
			return item;
		} else {
			return author$project$Query$transformQualifiedItem(item);
		}
	} else {
		if (_n0.b) {
			return item;
		} else {
			return 'title=' + item;
		}
	}
};
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var elm$core$String$trim = _String_trim;
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var elm$regex$Regex$split = _Regex_splitAtMost(_Regex_infinity);
var author$project$Query$parseQueryHelper = function (input) {
	var brackets = A2(
		elm$core$Maybe$withDefault,
		elm$regex$Regex$never,
		elm$regex$Regex$fromString('[, ]'));
	return A2(
		elm$core$String$join,
		'&',
		A2(
			elm$core$List$map,
			function (item) {
				return author$project$Query$transformItem(item);
			},
			A2(
				elm$core$List$filter,
				function (item) {
					return item !== '';
				},
				A2(
					elm$core$List$map,
					elm$core$String$trim,
					A2(
						elm$regex$Regex$split,
						brackets,
						A3(elm$core$String$replace, 'tag=', 'key=', input))))));
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var author$project$Query$parse = function (input) {
	var cmd = A2(
		elm$core$Maybe$withDefault,
		'NoCommand',
		elm$core$List$head(
			A2(elm$core$String$split, '=', input)));
	return A2(
		elm$core$List$member,
		cmd,
		_List_fromArray(
			['idlist'])) ? input : author$project$Query$parseQueryHelper(input);
};
var author$project$User$ReceiveToken = function (a) {
	return {$: 'ReceiveToken', a: a};
};
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$User$authenticationEncoder = F2(
	function (email, password) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'authenticate',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'email',
								elm$json$Json$Encode$string(email)),
								_Utils_Tuple2(
								'password',
								elm$json$Json$Encode$string(password))
							])))
				]));
	});
var author$project$User$Token = function (a) {
	return {$: 'Token', a: a};
};
var author$project$User$tokenDecoder = A2(
	elm$json$Json$Decode$map,
	author$project$User$Token,
	A2(elm$json$Json$Decode$field, 'token', elm$json$Json$Decode$string));
var author$project$User$tokenRequest = F2(
	function (email, password) {
		return elm$http$Http$request(
			{
				body: elm$http$Http$jsonBody(
					A2(author$project$User$authenticationEncoder, email, password)),
				expect: elm$http$Http$expectJson(author$project$User$tokenDecoder),
				headers: _List_Nil,
				method: 'Post',
				timeout: elm$core$Maybe$Just(5000),
				url: author$project$Configuration$backend + '/api/authentication/',
				withCredentials: false
			});
	});
var author$project$User$getToken = F2(
	function (email, password) {
		return A2(
			elm$http$Http$send,
			author$project$User$ReceiveToken,
			A2(author$project$User$tokenRequest, email, password));
	});
var author$project$User$User = function (a) {
	return {$: 'User', a: a};
};
var author$project$User$setToken = F2(
	function (token, _n0) {
		var user = _n0.a;
		return author$project$User$User(
			_Utils_update(
				user,
				{token: token}));
	});
var author$project$User$maybeSetToken = F2(
	function (token, maybeUser) {
		if (maybeUser.$ === 'Nothing') {
			return elm$core$Maybe$Nothing;
		} else {
			var user = maybeUser.a;
			return elm$core$Maybe$Just(
				A2(author$project$User$setToken, token, user));
		}
	});
var author$project$User$readToken = function (maybeToken) {
	if (maybeToken.$ === 'Nothing') {
		return elm$core$Maybe$Nothing;
	} else {
		var str = maybeToken.a.a;
		return elm$core$Maybe$Just(str);
	}
};
var elm$core$Platform$Cmd$map = _Platform_map;
var elm$core$String$reverse = _String_reverse;
var elm$core$String$toLower = _String_toLower;
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'AcceptPassword':
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{password: str}),
					elm$core$Platform$Cmd$none);
			case 'AcceptDocInfo':
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{docInfo: str}),
					elm$core$Platform$Cmd$none);
			case 'ReverseText':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							message: elm$core$String$toLower(
								elm$core$String$reverse(model.message))
						}),
					elm$core$Platform$Cmd$none);
			case 'UserMsg':
				var result = msg.a.a;
				if (result.$ === 'Ok') {
					var token = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								maybeCurrentUser: A2(author$project$User$maybeSetToken, token, model.maybeCurrentUser),
								maybeToken: elm$core$Maybe$Just(token),
								message: 'token OK'
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{message: 'Token error'}),
						elm$core$Platform$Cmd$none);
				}
			case 'DocMsg':
				var result = msg.a.a;
				if (result.$ === 'Ok') {
					var documentRecord = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{currentDocument: documentRecord.document, message: 'document OK'}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								message: author$project$Main$handleHttpError(err)
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'DocListMsg':
				if (msg.a.$ === 'ReceiveDocumentList') {
					var result = msg.a.a;
					if (result.$ === 'Ok') {
						var documentList = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									documentList: documentList,
									message: 'documentList: ' + elm$core$String$fromInt(
										author$project$DocumentList$documentListLength(documentList))
								}),
							elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									message: author$project$Main$handleHttpError(err)
								}),
							elm$core$Platform$Cmd$none);
					}
				} else {
					var result = msg.a.a;
					if (result.$ === 'Ok') {
						var documentList = result.a;
						var nextDocumentList = A2(
							author$project$DocumentList$select,
							elm$core$Maybe$Just(model.currentDocument),
							documentList);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									documentList: nextDocumentList,
									message: 'documentList: ' + elm$core$String$fromInt(
										author$project$DocumentList$documentListLength(documentList))
								}),
							elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									message: author$project$Main$handleHttpError(err)
								}),
							elm$core$Platform$Cmd$none);
					}
				}
			case 'DocListViewMsg':
				var document = msg.a.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							counter: model.counter + 1,
							currentDocument: document,
							documentList: A2(
								author$project$DocumentList$select,
								elm$core$Maybe$Just(document),
								model.documentList),
							message: 'document: ' + document.title
						}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocDictMsg,
						A4(
							author$project$DocumentDictionary$loadTexMacros,
							author$project$User$readToken(model.maybeToken),
							document,
							document.tags,
							model.documentDictionary)));
			case 'DocViewMsg':
				if (msg.a.$ === 'LoadMaster') {
					var docId = msg.a.a;
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(author$project$DocumentList$loadMasterDocument, model.maybeCurrentUser, docId)));
				} else {
					var docId = msg.a.a;
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(author$project$DocumentList$loadMasterDocumentWithCurrentSelection, model.maybeCurrentUser, docId)));
				}
			case 'GetToken':
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$UserMsg,
						A2(author$project$User$getToken, 'jxxcarlson@gmail.com', model.password)));
			case 'GetDocumentById':
				var id = msg.a;
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocMsg,
						A2(
							author$project$Document$getDocumentById,
							id,
							author$project$User$readToken(model.maybeToken))));
			case 'GetPublicDocuments':
				var query = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{message: 'query: ' + query}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocListMsg,
						A2(
							author$project$DocumentList$findDocuments,
							elm$core$Maybe$Nothing,
							author$project$Query$parse(query))));
			case 'GetUserDocuments':
				var query = msg.a;
				var _n5 = model.maybeCurrentUser;
				if (_n5.$ === 'Nothing') {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var user = _n5.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{message: 'query: ' + query}),
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(
								author$project$DocumentList$findDocuments,
								elm$core$Maybe$Just(user),
								author$project$Query$parse(query))));
				}
			case 'LoadMasterDocument':
				var idString = msg.a;
				var _n6 = elm$core$String$toInt(idString);
				if (_n6.$ === 'Nothing') {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var id = _n6.a;
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(author$project$DocumentList$loadMasterDocument, model.maybeCurrentUser, id)));
				}
			default:
				var result = msg.a.a;
				if (result.$ === 'Ok') {
					var documentRecord = result.a;
					var doc = documentRecord.document;
					var dict = model.documentDictionary;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								documentDictionary: A3(author$project$DocumentDictionary$put, 'texmacros', doc, dict)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								message: author$project$Main$handleHttpError(err)
							}),
						elm$core$Platform$Cmd$none);
				}
		}
	});
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$property = elm$virtual_dom$VirtualDom$property;
var author$project$Document$asciidocText = function (content) {
	return A3(
		elm$html$Html$node,
		'asciidoc-text',
		_List_fromArray(
			[
				A2(
				elm$html$Html$Attributes$property,
				'content',
				elm$json$Json$Encode$string('== ASCIIDOC\n\n*This is a test*'))
			]),
		_List_Nil);
};
var mdgriffith$stylish_elephants$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var mdgriffith$stylish_elephants$Element$height = mdgriffith$stylish_elephants$Internal$Model$Height;
var mdgriffith$stylish_elephants$Internal$Model$Content = {$: 'Content'};
var mdgriffith$stylish_elephants$Element$shrink = mdgriffith$stylish_elephants$Internal$Model$Content;
var mdgriffith$stylish_elephants$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var mdgriffith$stylish_elephants$Element$width = mdgriffith$stylish_elephants$Internal$Model$Width;
var mdgriffith$stylish_elephants$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsEl = {$: 'AsEl'};
var mdgriffith$stylish_elephants$Internal$Model$asEl = mdgriffith$stylish_elephants$Internal$Model$AsEl;
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var mdgriffith$stylish_elephants$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var mdgriffith$stylish_elephants$Internal$Flag$Second = function (a) {
	return {$: 'Second', a: a};
};
var mdgriffith$stylish_elephants$Internal$Flag$flag = function (i) {
	return (i > 31) ? mdgriffith$stylish_elephants$Internal$Flag$Second(1 << (i - 32)) : mdgriffith$stylish_elephants$Internal$Flag$Flag(1 << i);
};
var mdgriffith$stylish_elephants$Internal$Flag$heightContent = mdgriffith$stylish_elephants$Internal$Flag$flag(36);
var elm$core$Bitwise$and = _Bitwise_and;
var mdgriffith$stylish_elephants$Internal$Flag$present = F2(
	function (myFlag, _n0) {
		var fieldOne = _n0.a;
		var fieldTwo = _n0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$widthContent = mdgriffith$stylish_elephants$Internal$Flag$flag(38);
var mdgriffith$stylish_elephants$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$addWhen = F3(
	function (ifThis, x, to) {
		return ifThis ? A2(elm$core$List$cons, x, to) : to;
	});
var mdgriffith$stylish_elephants$Internal$Model$AllowHover = {$: 'AllowHover'};
var mdgriffith$stylish_elephants$Internal$Model$Layout = {$: 'Layout'};
var mdgriffith$stylish_elephants$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle = {
	backgroundColor: elm$core$Maybe$Nothing,
	borderColor: elm$core$Maybe$Nothing,
	shadow: elm$core$Maybe$Just(
		{
			blur: 3,
			color: A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var mdgriffith$stylish_elephants$Internal$Model$defaultOptions = {focus: mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle, hover: mdgriffith$stylish_elephants$Internal$Model$AllowHover, mode: mdgriffith$stylish_elephants$Internal$Model$Layout};
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$member, key, dict);
	});
var mdgriffith$stylish_elephants$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return elm$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return elm$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + (elm$core$String$fromInt(min) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + (elm$core$String$fromInt(max) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
	}
};
var mdgriffith$stylish_elephants$Internal$Model$pseudoClassName = function (_class) {
	switch (_class.$) {
		case 'Focus':
			return 'focus';
		case 'Hover':
			return 'hover';
		default:
			return 'active';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + elm$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var x = style.a;
			var y = style.b;
			return 'spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
		case 'PaddingStyle':
			var top = style.a;
			var right = style.b;
			var bottom = style.c;
			var left = style.d;
			return 'pad-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + ('-' + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))));
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'gp grid-pos-' + (elm$core$String$fromInt(pos.row) + ('-' + (elm$core$String$fromInt(pos.col) + ('-' + (elm$core$String$fromInt(pos.width) + ('-' + elm$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			return A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$pseudoClassName(selector),
					A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$getStyleName, subStyle)));
		default:
			return 'transformation';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$reduceStyles = F2(
	function (style, _n0) {
		var cache = _n0.a;
		var existing = _n0.b;
		var styleName = mdgriffith$stylish_elephants$Internal$Model$getStyleName(style);
		return A2(elm$core$Set$member, styleName, cache) ? _Utils_Tuple2(cache, existing) : _Utils_Tuple2(
			A2(elm$core$Set$insert, styleName, cache),
			A2(elm$core$List$cons, style, existing));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var mdgriffith$stylish_elephants$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var elm$core$String$fromFloat = _String_fromNumber;
var elm$core$Basics$round = _Basics_round;
var mdgriffith$stylish_elephants$Internal$Model$formatColor = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return 'rgba(' + (elm$core$String$fromInt(
		elm$core$Basics$round(red * 255)) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(green * 255))) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(blue * 255))) + (',' + (elm$core$String$fromFloat(alpha) + ')')))));
};
var mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? elm$core$Maybe$Just('inset') : elm$core$Maybe$Nothing,
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.offset.a) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.offset.b) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.blur) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.size) + 'px'),
					elm$core$Maybe$Just(
					mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.color))
				])));
};
var mdgriffith$stylish_elephants$Internal$Style$classes = {above: 'a', active: 'atv', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', alignedHorizontally: 'ah', alignedVertically: 'av', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'cr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fcs', grid: 'g', heightContent: 'hc', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', inFront: 'fr', inputMultiline: 'iml', inputText: 'it', italic: 'i', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'se', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sb', single: 'e', spaceEvenly: 'se', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp'};
var mdgriffith$stylish_elephants$Internal$Style$dot = function (c) {
	return '.' + c;
};
var mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle = function (focus) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$Style,
		mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + (':focus .focusable, ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + '.focusable:focus')),
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					A2(
					elm$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'border-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.borderColor),
					A2(
					elm$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'background-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.backgroundColor),
					A2(
					elm$core$Maybe$map,
					function (shadow) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'box-shadow',
							mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(
								{
									blur: shadow.blur,
									color: shadow.color,
									inset: false,
									offset: A2(
										elm$core$Tuple$mapSecond,
										elm$core$Basics$toFloat,
										A2(elm$core$Tuple$mapFirst, elm$core$Basics$toFloat, shadow.offset)),
									size: shadow.size
								}));
					},
					focus.shadow),
					elm$core$Maybe$Just(
					A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'outline', 'none'))
				])));
};
var elm$core$Basics$not = _Basics_not;
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var mdgriffith$stylish_elephants$Internal$Flag$alignBottom = mdgriffith$stylish_elephants$Internal$Flag$flag(41);
var mdgriffith$stylish_elephants$Internal$Flag$alignRight = mdgriffith$stylish_elephants$Internal$Flag$flag(40);
var mdgriffith$stylish_elephants$Internal$Flag$centerX = mdgriffith$stylish_elephants$Internal$Flag$flag(42);
var mdgriffith$stylish_elephants$Internal$Flag$centerY = mdgriffith$stylish_elephants$Internal$Flag$flag(43);
var mdgriffith$stylish_elephants$Internal$Flag$heightBetween = mdgriffith$stylish_elephants$Internal$Flag$flag(45);
var mdgriffith$stylish_elephants$Internal$Flag$heightFill = mdgriffith$stylish_elephants$Internal$Flag$flag(37);
var mdgriffith$stylish_elephants$Internal$Flag$widthBetween = mdgriffith$stylish_elephants$Internal$Flag$flag(44);
var mdgriffith$stylish_elephants$Internal$Flag$widthFill = mdgriffith$stylish_elephants$Internal$Flag$flag(39);
var mdgriffith$stylish_elephants$Internal$Model$vDomClass = function (cls) {
	return A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(cls));
};
var mdgriffith$stylish_elephants$Internal$Model$renderNode = F4(
	function (_n0, children, styles, context) {
		var attributes = _n0.attributes;
		var node = _n0.node;
		var has = _n0.has;
		var createNode = F3(
			function (nodeName, attrs, withStyles) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 'Nothing') {
								return keyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm$core$List$cons,
									_Utils_Tuple2(
										'stylesheet',
										A3(
											elm$virtual_dom$VirtualDom$node,
											'style',
											_List_fromArray(
												[
													mdgriffith$stylish_elephants$Internal$Model$vDomClass('stylesheet')
												]),
											_List_fromArray(
												[
													elm$virtual_dom$VirtualDom$text(stylesheet)
												]))),
									keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A3(
						elm$virtual_dom$VirtualDom$node,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 'Nothing') {
								return unkeyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm$core$List$cons,
									A3(
										elm$virtual_dom$VirtualDom$node,
										'style',
										_List_fromArray(
											[
												mdgriffith$stylish_elephants$Internal$Model$vDomClass('stylesheet')
											]),
										_List_fromArray(
											[
												elm$virtual_dom$VirtualDom$text(stylesheet)
											])),
									unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A3(createNode, 'div', attributes, styles);
				case 'NodeName':
					var nodeName = node.a;
					return A3(createNode, nodeName, attributes, styles);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A3(
								createNode,
								internal,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Internal$Model$vDomClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.single))
									]),
								styles)
							]));
			}
		}();
		switch (context.$) {
			case 'AsRow':
				return (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthFill, has) && (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthBetween, has))) ? html : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$alignRight, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$centerX, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightFill, has) && (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightBetween, has))) ? html : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$centerY, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$alignBottom, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var mdgriffith$stylish_elephants$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Left = {$: 'Left'};
var mdgriffith$stylish_elephants$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Right = {$: 'Right'};
var mdgriffith$stylish_elephants$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var mdgriffith$stylish_elephants$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Bottom = {$: 'Bottom'};
var mdgriffith$stylish_elephants$Internal$Style$CenterX = {$: 'CenterX'};
var mdgriffith$stylish_elephants$Internal$Style$CenterY = {$: 'CenterY'};
var mdgriffith$stylish_elephants$Internal$Style$Top = {$: 'Top'};
var mdgriffith$stylish_elephants$Internal$Style$alignments = _List_fromArray(
	[mdgriffith$stylish_elephants$Internal$Style$Top, mdgriffith$stylish_elephants$Internal$Style$Bottom, mdgriffith$stylish_elephants$Internal$Style$Right, mdgriffith$stylish_elephants$Internal$Style$Left, mdgriffith$stylish_elephants$Internal$Style$CenterX, mdgriffith$stylish_elephants$Internal$Style$CenterY]);
var mdgriffith$stylish_elephants$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _n1 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _n2 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentBottom);
		case 'Right':
			var _n3 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentRight);
		case 'Left':
			var _n4 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _n5 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterX);
		default:
			var _n6 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _n1 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _n2 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignBottom);
		case 'Right':
			var _n3 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignRight);
		case 'Left':
			var _n4 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _n5 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX);
		default:
			var _n6 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _n0 = values(alignment);
		var content = _n0.a;
		var indiv = _n0.b;
		return _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Descriptor,
				mdgriffith$stylish_elephants$Internal$Style$contentName(
					mdgriffith$stylish_elephants$Internal$Style$Content(alignment)),
				content),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(
							mdgriffith$stylish_elephants$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return mdgriffith$stylish_elephants$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(
							mdgriffith$stylish_elephants$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return mdgriffith$stylish_elephants$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$Above = {$: 'Above'};
var mdgriffith$stylish_elephants$Internal$Style$Behind = {$: 'Behind'};
var mdgriffith$stylish_elephants$Internal$Style$Below = {$: 'Below'};
var mdgriffith$stylish_elephants$Internal$Style$OnLeft = {$: 'OnLeft'};
var mdgriffith$stylish_elephants$Internal$Style$OnRight = {$: 'OnRight'};
var mdgriffith$stylish_elephants$Internal$Style$Within = {$: 'Within'};
var mdgriffith$stylish_elephants$Internal$Style$locations = function () {
	var loc = mdgriffith$stylish_elephants$Internal$Style$Above;
	var _n0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[mdgriffith$stylish_elephants$Internal$Style$Above, mdgriffith$stylish_elephants$Internal$Style$Below, mdgriffith$stylish_elephants$Internal$Style$OnRight, mdgriffith$stylish_elephants$Internal$Style$OnLeft, mdgriffith$stylish_elephants$Internal$Style$Within, mdgriffith$stylish_elephants$Internal$Style$Behind]);
}();
var mdgriffith$stylish_elephants$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row) + (' > ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + (' { flex-basis: auto !important; } ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row) + (' > ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.container) + ' { flex-basis: auto !important; }}'))))))))));
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var mdgriffith$stylish_elephants$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return mdgriffith$stylish_elephants$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var mdgriffith$stylish_elephants$Internal$Style$renderRules = F2(
	function (_n0, rulesToRender) {
		var parent = _n0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _n2 = rule.a;
						var prop = _n2.a;
						var value = _n2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(
											mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return mdgriffith$stylish_elephants$Internal$Style$Intermediate(
			A3(elm$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var mdgriffith$stylish_elephants$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return elm$core$String$concat(
			A2(
				elm$core$List$map,
				function (_n3) {
					var x = _n3.a;
					var y = _n3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _n2 = rule.props;
		if (!_n2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_n0) {
		var rule = _n0.a;
		return _Utils_ap(
			renderClass(rule),
			elm$core$String$concat(
				A2(elm$core$List$map, renderIntermediate, rule.others)));
	};
	return elm$core$String$concat(
		A2(
			elm$core$List$map,
			renderIntermediate,
			A3(
				elm$core$List$foldr,
				F2(
					function (_n1, existing) {
						var name = _n1.a;
						var styleRules = _n1.b;
						return A2(
							elm$core$List$cons,
							A2(
								mdgriffith$stylish_elephants$Internal$Style$renderRules,
								A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var mdgriffith$stylish_elephants$Internal$Style$rules = _Utils_ap(
	mdgriffith$stylish_elephants$Internal$Style$overrides,
	mdgriffith$stylish_elephants$Internal$Style$renderCompact(
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				'html,body',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'padding', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + ':focus',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'outline', 'none')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.root),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'min-height', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '0'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						_Utils_ap(
							mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
							mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill)),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Child,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.inFront),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'fixed')
									]))
							]))
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'relative'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'resize', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'box-sizing', 'border-box'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'padding', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-size', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'color', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-family', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'line-height', '1'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'inherit'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.noTextSelection),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-moz-user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-webkit-user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'user-select', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cursorPointer),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'pointer')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cursorText),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'text')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.passPointerEvents),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none !important')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.capturePointerEvents),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto !important')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.transparent),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.opaque),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.hover, mdgriffith$stylish_elephants$Internal$Style$classes.transparent)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.hover, mdgriffith$stylish_elephants$Internal$Style$classes.opaque)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.focus, mdgriffith$stylish_elephants$Internal$Style$classes.transparent)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.focus, mdgriffith$stylish_elephants$Internal$Style$classes.opaque)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.active, mdgriffith$stylish_elephants$Internal$Style$classes.transparent)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.active, mdgriffith$stylish_elephants$Internal$Style$classes.opaque)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.transition),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Prop,
								'transition',
								A2(
									elm$core$String$join,
									', ',
									A2(
										elm$core$List$map,
										function (x) {
											return x + ' 160ms';
										},
										_List_fromArray(
											['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.overflowHidden),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-overflow-style', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.scrollbars),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.scrollbarsX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.scrollbarsY),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.column),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.single),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.clip),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.clipX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.clipY),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', 'auto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderNone),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderDashed),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dashed')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderDotted),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dotted')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderSolid),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-block')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.inputText),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'line-height', '1.05')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.seButton),
								_List_fromArray(
									[
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
										_List_fromArray(
											[
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
													])),
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'auto !important')
													]))
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightContent),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Child,
														mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto')
															]))
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
													]));
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', '0%'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthExact),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFillPortion),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.container),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerRight,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-left', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-right', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerRight + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_Nil);
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_Nil);
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
									}
								}),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.spaceEvenly),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFillPortion),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerBottom,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerBottom + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
									}
								}),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.container),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.spaceEvenly),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', '-ms-grid'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'.gp',
								_List_fromArray(
									[
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Supports,
								_Utils_Tuple2('display', 'grid'),
								_List_fromArray(
									[
										_Utils_Tuple2('display', 'grid')
									])),
								mdgriffith$stylish_elephants$Internal$Style$gridAlignments(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
												]);
										case 'Bottom':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
												]);
										case 'Right':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
												]);
										case 'Left':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
												]);
										case 'CenterX':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
												]);
										default:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
												]);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.page),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any + ':first-child'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.any + (mdgriffith$stylish_elephants$Internal$Style$selfName(
										mdgriffith$stylish_elephants$Internal$Style$Self(mdgriffith$stylish_elephants$Internal$Style$Left)) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.any))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.any + (mdgriffith$stylish_elephants$Internal$Style$selfName(
										mdgriffith$stylish_elephants$Internal$Style$Self(mdgriffith$stylish_elephants$Internal$Style$Right)) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.any))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Bottom':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Right':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'right'),
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'content', '\"\"'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'table'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'left'),
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'content', '\"\"'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'table'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 'CenterX':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.inputMultiline),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre-wrap')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.paragraph),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.single),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.inFront),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.behind),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.above),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.below),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onRight),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onLeft),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.column),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.grid),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-grid')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Bottom':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Right':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'right')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'left')
													]));
										case 'CenterX':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.hidden',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'none')
							])),
						mdgriffith$stylish_elephants$Internal$Style$Batch(
						function (fn) {
							return A2(elm$core$List$map, fn, mdgriffith$stylish_elephants$Internal$Style$locations);
						}(
							function (loc) {
								switch (loc.$) {
									case 'Above':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.above),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'bottom', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														])),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
														])),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									case 'Below':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.below),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'bottom', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														]))
												]));
									case 'OnRight':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onRight),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 'OnLeft':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onLeft),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'right', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 'Within':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.inFront),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									default:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.behind),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
								}
							})),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textThin),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '100')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textExtraLight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '200')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textLight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '300')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textNormalWeight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '400')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textMedium),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '500')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textSemiBold),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '600')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bold),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '700')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textExtraBold),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '800')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textHeavy),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '900')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.italic),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'italic')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.strike),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'line-through')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.underline),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'underline'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip', 'ink')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textUnitalicized),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'normal')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textJustify),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textJustifyAll),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify-all')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textCenter),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'center')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textRight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'right')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textLeft),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'left')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.modal',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'fixed'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none')
							]))
					]))
			])));
var mdgriffith$stylish_elephants$Internal$Model$staticRoot = A3(
	elm$virtual_dom$VirtualDom$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			elm$virtual_dom$VirtualDom$text(mdgriffith$stylish_elephants$Internal$Style$rules)
		]));
var mdgriffith$stylish_elephants$Internal$Model$textElement = function (str) {
	return A3(
		elm$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm$virtual_dom$VirtualDom$property,
				'className',
				elm$json$Json$Encode$string(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.text, mdgriffith$stylish_elephants$Internal$Style$classes.widthContent, mdgriffith$stylish_elephants$Internal$Style$classes.heightContent]))))
			]),
		_List_fromArray(
			[
				elm$virtual_dom$VirtualDom$text(str)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$textElementFill = function (str) {
	return A3(
		elm$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm$virtual_dom$VirtualDom$property,
				'className',
				elm$json$Json$Encode$string(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.text, mdgriffith$stylish_elephants$Internal$Style$classes.widthFill, mdgriffith$stylish_elephants$Internal$Style$classes.heightFill]))))
			]),
		_List_fromArray(
			[
				elm$virtual_dom$VirtualDom$text(str)
			]));
};
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var mdgriffith$stylish_elephants$Internal$Model$Active = {$: 'Active'};
var mdgriffith$stylish_elephants$Internal$Model$Focus = {$: 'Focus'};
var mdgriffith$stylish_elephants$Internal$Model$Hover = {$: 'Hover'};
var mdgriffith$stylish_elephants$Internal$Model$renderFont = function (families) {
	var fontName = function (font) {
		switch (font.$) {
			case 'Serif':
				return 'serif';
			case 'SansSerif':
				return 'sans-serif';
			case 'Monospace':
				return 'monospace';
			case 'Typeface':
				var name = font.a;
				return '\"' + (name + '\"');
			default:
				var name = font.a;
				var url = font.b;
				return '\"' + (name + '\"');
		}
	};
	return A2(
		elm$core$String$join,
		', ',
		A2(elm$core$List$map, fontName, families));
};
var mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var renderTopLevels = function (rule) {
			if (rule.$ === 'FontFamily') {
				var name = rule.a;
				var typefaces = rule.b;
				var getImports = function (font) {
					if (font.$ === 'ImportFont') {
						var url = font.b;
						return elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
					} else {
						return elm$core$Maybe$Nothing;
					}
				};
				return elm$core$Maybe$Just(
					A2(
						elm$core$String$join,
						'\n',
						A2(elm$core$List$filterMap, getImports, typefaces)));
			} else {
				return elm$core$Maybe$Nothing;
			}
		};
		var renderProps = F3(
			function (force, _n18, existing) {
				var key = _n18.a;
				var val = _n18.b;
				return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
			});
		var renderStyle = F4(
			function (force, maybePseudo, selector, props) {
				if (maybePseudo.$ === 'Nothing') {
					return selector + ('{' + (A3(
						elm$core$List$foldl,
						renderProps(force),
						'',
						props) + '\n}'));
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo.$) {
						case 'Hover':
							return selector + (':hover {' + (A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
						case 'Focus':
							var renderedProps = A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props);
							return A2(
								elm$core$String$join,
								'\n',
								_List_fromArray(
									[selector + (':focus {' + (renderedProps + '\n}')), '.se:focus ~ ' + (selector + (':not(.focus)  {' + (renderedProps + '\n}'))), '.se:focus ' + (selector + ('  {' + (renderedProps + '\n}')))]));
						default:
							return selector + (':active {' + (A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
					}
				}
			});
		var renderStyleRule = F3(
			function (rule, maybePseudo, force) {
				switch (rule.$) {
					case 'Style':
						var selector = rule.a;
						var props = rule.b;
						return A4(renderStyle, force, maybePseudo, selector, props);
					case 'Shadows':
						var name = rule.a;
						var prop = rule.b;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'box-shadow', prop)
								]));
					case 'Transparency':
						var name = rule.a;
						var transparency = rule.b;
						var opacity = A2(
							elm$core$Basics$max,
							0,
							A2(elm$core$Basics$min, 1, 1 - transparency));
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'opacity',
									elm$core$String$fromFloat(opacity))
								]));
					case 'FontSize':
						var i = rule.a;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.font-size-' + elm$core$String$fromInt(i),
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'font-size',
									elm$core$String$fromInt(i) + 'px')
								]));
					case 'FontFamily':
						var name = rule.a;
						var typefaces = rule.b;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'font-family',
									mdgriffith$stylish_elephants$Internal$Model$renderFont(typefaces))
								]));
					case 'Single':
						var _class = rule.a;
						var prop = rule.b;
						var val = rule.c;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, prop, val)
								]));
					case 'Colored':
						var _class = rule.a;
						var prop = rule.b;
						var color = rule.c;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									prop,
									mdgriffith$stylish_elephants$Internal$Model$formatColor(color))
								]));
					case 'SpacingStyle':
						var x = rule.a;
						var y = rule.b;
						var yPx = elm$core$String$fromInt(y) + 'px';
						var xPx = elm$core$String$fromInt(x) + 'px';
						var row = '.' + function ($) {
							return $.row;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var right = '.' + function ($) {
							return $.alignRight;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var paragraph = '.' + function ($) {
							return $.paragraph;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var page = '.' + function ($) {
							return $.page;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var left = '.' + function ($) {
							return $.alignLeft;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var column = '.' + function ($) {
							return $.column;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var _class = '.spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
						var any = '.' + function ($) {
							return $.any;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						return A3(
							elm$core$List$foldl,
							elm$core$Basics$append,
							'',
							_List_fromArray(
								[
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (row + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (column + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + left)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + right)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_Utils_ap(_class, paragraph),
									_List_fromArray(
										[
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'line-height',
											'calc(1em + ' + (elm$core$String$fromInt(y) + 'px)'))
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									'textarea' + _class,
									_List_fromArray(
										[
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'line-height',
											'calc(1em + ' + (elm$core$String$fromInt(y) + 'px)'))
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + (' > ' + left)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + (' > ' + right)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + '::after'),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'content', '\'\''),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'display', 'block'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'height', '0'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'width', '0'),
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'margin-top',
											elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + '::before'),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'content', '\'\''),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'display', 'block'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'height', '0'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'width', '0'),
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'margin-bottom',
											elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										]))
								]));
					case 'PaddingStyle':
						var top = rule.a;
						var right = rule.b;
						var bottom = rule.c;
						var left = rule.d;
						var _class = '.pad-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + ('-' + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))));
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'padding',
									elm$core$String$fromInt(top) + ('px ' + (elm$core$String$fromInt(right) + ('px ' + (elm$core$String$fromInt(bottom) + ('px ' + (elm$core$String$fromInt(left) + 'px')))))))
								]));
					case 'GridTemplateStyle':
						var template = rule.a;
						var toGridLengthHelper = F3(
							function (minimum, maximum, x) {
								switch (x.$) {
									case 'Px':
										var px = x.a;
										return elm$core$String$fromInt(px) + 'px';
									case 'Content':
										var _n2 = _Utils_Tuple2(minimum, maximum);
										if (_n2.a.$ === 'Nothing') {
											if (_n2.b.$ === 'Nothing') {
												var _n3 = _n2.a;
												var _n4 = _n2.b;
												return 'max-content';
											} else {
												var _n6 = _n2.a;
												var maxSize = _n2.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n2.b.$ === 'Nothing') {
												var minSize = _n2.a.a;
												var _n5 = _n2.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
											} else {
												var minSize = _n2.a.a;
												var maxSize = _n2.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 'Fill':
										var i = x.a;
										var _n7 = _Utils_Tuple2(minimum, maximum);
										if (_n7.a.$ === 'Nothing') {
											if (_n7.b.$ === 'Nothing') {
												var _n8 = _n7.a;
												var _n9 = _n7.b;
												return elm$core$String$fromInt(i) + 'fr';
											} else {
												var _n11 = _n7.a;
												var maxSize = _n7.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n7.b.$ === 'Nothing') {
												var minSize = _n7.a.a;
												var _n10 = _n7.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
											} else {
												var minSize = _n7.a.a;
												var maxSize = _n7.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 'Min':
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											elm$core$Maybe$Just(m),
											maximum,
											len);
									default:
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											minimum,
											elm$core$Maybe$Just(m),
											len);
								}
							});
						var toGridLength = function (x) {
							return A3(toGridLengthHelper, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing, x);
						};
						var xSpacing = toGridLength(template.spacing.a);
						var ySpacing = toGridLength(template.spacing.b);
						var rows = function (x) {
							return 'grid-template-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.rows)));
						var msRows = function (x) {
							return '-ms-grid-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.columns)));
						var msColumns = function (x) {
							return '-ms-grid-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.columns)));
						var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
						var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
						var columns = function (x) {
							return 'grid-template-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.columns)));
						var _class = '.grid-rows-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.b)))))));
						var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msColumns + (msRows + '}')));
						return _Utils_ap(base, supports);
					case 'GridPosition':
						var position = rule.a;
						var msPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'-ms-grid-row: ' + (elm$core$String$fromInt(position.row) + ';'),
									'-ms-grid-row-span: ' + (elm$core$String$fromInt(position.height) + ';'),
									'-ms-grid-column: ' + (elm$core$String$fromInt(position.col) + ';'),
									'-ms-grid-column-span: ' + (elm$core$String$fromInt(position.width) + ';')
								]));
						var modernPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'grid-row: ' + (elm$core$String$fromInt(position.row) + (' / ' + (elm$core$String$fromInt(position.row + position.height) + ';'))),
									'grid-column: ' + (elm$core$String$fromInt(position.col) + (' / ' + (elm$core$String$fromInt(position.col + position.width) + ';')))
								]));
						var _class = '.grid-pos-' + (elm$core$String$fromInt(position.row) + ('-' + (elm$core$String$fromInt(position.col) + ('-' + (elm$core$String$fromInt(position.width) + ('-' + elm$core$String$fromInt(position.height)))))));
						var modernGrid = _class + ('{' + (modernPosition + '}'));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msPosition + '}'));
						return _Utils_ap(base, supports);
					case 'PseudoSelector':
						var _class = rule.a;
						var styles = rule.b;
						var renderPseudoRule = function (style) {
							switch (_class.$) {
								case 'Focus':
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Focus),
										false);
								case 'Active':
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Active),
										false);
								default:
									var _n13 = options.hover;
									switch (_n13.$) {
										case 'NoHover':
											return '';
										case 'AllowHover':
											return A3(
												renderStyleRule,
												style,
												elm$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Hover),
												false);
										default:
											return A3(renderStyleRule, style, elm$core$Maybe$Nothing, true);
									}
							}
						};
						return A2(
							elm$core$String$join,
							' ',
							A2(elm$core$List$map, renderPseudoRule, styles));
					default:
						return '';
				}
			});
		var combine = F2(
			function (style, rendered) {
				return _Utils_update(
					rendered,
					{
						rules: _Utils_ap(
							rendered.rules,
							A3(renderStyleRule, style, elm$core$Maybe$Nothing, false)),
						topLevel: function () {
							var _n15 = renderTopLevels(style);
							if (_n15.$ === 'Nothing') {
								return rendered.topLevel;
							} else {
								var topLevel = _n15.a;
								return _Utils_ap(rendered.topLevel, topLevel);
							}
						}()
					});
			});
		return function (_n14) {
			var rules = _n14.rules;
			var topLevel = _n14.topLevel;
			return _Utils_ap(topLevel, rules);
		}(
			A3(
				elm$core$List$foldl,
				combine,
				{rules: '', topLevel: ''},
				stylesheet));
	});
var mdgriffith$stylish_elephants$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		return A3(
			elm$virtual_dom$VirtualDom$node,
			'style',
			_List_Nil,
			_List_fromArray(
				[
					elm$virtual_dom$VirtualDom$text(
					A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString, options, styleSheet))
				]));
	});
var mdgriffith$stylish_elephants$Internal$Model$asElement = F4(
	function (embedMode, children, context, rendered) {
		var gatherKeyed = F2(
			function (_n11, _n12) {
				var key = _n11.a;
				var child = _n11.b;
				var htmls = _n12.a;
				var existingStyles = _n12.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, elm$core$Maybe$Nothing, context)),
								htmls),
							_Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthContent, rendered.has) && (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightContent, rendered.has) && _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl))) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									elm$virtual_dom$VirtualDom$text(str)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									mdgriffith$stylish_elephants$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _n9) {
				var htmls = _n9.a;
				var existingStyles = _n9.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								A2(styled.html, elm$core$Maybe$Nothing, context),
								htmls),
							_Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$textElementFill(str),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var _n0 = function () {
			if (children.$ === 'Keyed') {
				var keyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Keyed,
					A3(
						elm$core$List$foldr,
						gatherKeyed,
						_Utils_Tuple2(_List_Nil, rendered.styles),
						keyedChildren));
			} else {
				var unkeyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed,
					A3(
						elm$core$List$foldr,
						gather,
						_Utils_Tuple2(_List_Nil, rendered.styles),
						unkeyedChildren));
			}
		}();
		var htmlChildren = _n0.a;
		var styleChildren = _n0.b;
		var _n2 = function () {
			switch (embedMode.$) {
				case 'NoStyleSheet':
					return _Utils_Tuple3(false, false, mdgriffith$stylish_elephants$Internal$Model$defaultOptions);
				case 'StaticRootAndDynamic':
					var opts = embedMode.a;
					return _Utils_Tuple3(true, true, opts);
				default:
					var opts = embedMode.a;
					return _Utils_Tuple3(false, true, opts);
			}
		}();
		var renderStatic = _n2.a;
		var renderDynamic = _n2.b;
		var options = _n2.c;
		var styles = function () {
			if (embedMode.$ === 'NoStyleSheet') {
				return _List_Nil;
			} else {
				return A3(
					elm$core$List$foldl,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.focus)
							])),
					styleChildren).b;
			}
		}();
		var renderedChildren = function () {
			if (htmlChildren.$ === 'Keyed') {
				var keyed = htmlChildren.a;
				return mdgriffith$stylish_elephants$Internal$Model$Keyed(
					A3(
						mdgriffith$stylish_elephants$Internal$Model$addWhen,
						renderStatic,
						_Utils_Tuple2('static-stylesheet', mdgriffith$stylish_elephants$Internal$Model$staticRoot),
						A3(
							mdgriffith$stylish_elephants$Internal$Model$addWhen,
							renderDynamic,
							_Utils_Tuple2(
								'dynamic-stylesheet',
								A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
							_Utils_ap(
								A2(
									elm$core$List$map,
									function (x) {
										return _Utils_Tuple2('nearby-elements-pls', x);
									},
									rendered.children),
								keyed))));
			} else {
				var unkeyed = htmlChildren.a;
				return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
					A3(
						mdgriffith$stylish_elephants$Internal$Model$addWhen,
						renderStatic,
						mdgriffith$stylish_elephants$Internal$Model$staticRoot,
						A3(
							mdgriffith$stylish_elephants$Internal$Model$addWhen,
							renderDynamic,
							A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
							_Utils_ap(rendered.children, unkeyed))));
			}
		}();
		if (embedMode.$ === 'NoStyleSheet') {
			if (!styleChildren.b) {
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
			} else {
				return mdgriffith$stylish_elephants$Internal$Model$Styled(
					{
						html: A2(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren),
						styles: styleChildren
					});
			}
		} else {
			return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
				A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$htmlClass = function (cls) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(
			elm$virtual_dom$VirtualDom$property,
			'className',
			elm$json$Json$Encode$string(cls)));
};
var mdgriffith$stylish_elephants$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.row));
		case 'AsColumn':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.column));
		case 'AsEl':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.single));
		case 'AsGrid':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.grid));
		case 'AsParagraph':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.paragraph));
		default:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.page));
	}
};
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$floatClass = function (x) {
	return elm$core$String$fromInt(
		elm$core$Basics$round(x * 255));
};
var mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup = F2(
	function (maybePseudo, group) {
		var translate = A2(
			elm$core$Maybe$map,
			function (_n9) {
				var x = _n9.a;
				var y = _n9.b;
				var z = _n9.c;
				return 'translate3d(' + (elm$core$String$fromFloat(
					A2(elm$core$Maybe$withDefault, 0, x)) + ('px, ' + (elm$core$String$fromFloat(
					A2(elm$core$Maybe$withDefault, 0, y)) + ('px, ' + (elm$core$String$fromFloat(
					A2(elm$core$Maybe$withDefault, 0, z)) + 'px)')))));
			},
			group.translate);
		var scale = A2(
			elm$core$Maybe$map,
			function (_n8) {
				var x = _n8.a;
				var y = _n8.b;
				var z = _n8.c;
				return 'scale3d(' + (elm$core$String$fromFloat(x) + (', ' + (elm$core$String$fromFloat(y) + (', ' + (elm$core$String$fromFloat(z) + ')')))));
			},
			group.scale);
		var rotate = A2(
			elm$core$Maybe$map,
			function (_n7) {
				var x = _n7.a;
				var y = _n7.b;
				var z = _n7.c;
				var angle = _n7.d;
				return 'rotate3d(' + (elm$core$String$fromFloat(x) + (',' + (elm$core$String$fromFloat(y) + (',' + (elm$core$String$fromFloat(z) + (',' + (elm$core$String$fromFloat(angle) + 'rad)')))))));
			},
			group.rotate);
		var transformations = A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[scale, translate, rotate]));
		var name = A2(
			elm$core$String$join,
			'-',
			A2(
				elm$core$List$filterMap,
				elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$map,
						function (_n4) {
							var x = _n4.a;
							var y = _n4.b;
							var z = _n4.c;
							return 'move-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, x)) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, y)) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, z))))));
						},
						group.translate),
						A2(
						elm$core$Maybe$map,
						function (_n5) {
							var x = _n5.a;
							var y = _n5.b;
							var z = _n5.c;
							return 'scale' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(z)))));
						},
						group.scale),
						A2(
						elm$core$Maybe$map,
						function (_n6) {
							var x = _n6.a;
							var y = _n6.b;
							var z = _n6.c;
							var angle = _n6.d;
							return 'rotate-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(z) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(angle)))))));
						},
						group.rotate)
					])));
		if (!transformations.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var trans = transformations;
			var transforms = A2(elm$core$String$join, ' ', trans);
			var _n1 = function () {
				if (maybePseudo.$ === 'Nothing') {
					return _Utils_Tuple2('transform-' + name, '.transform-' + name);
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo.$) {
						case 'Hover':
							return _Utils_Tuple2('transform-' + (name + '-hover'), '.transform-' + (name + '-hover:hover'));
						case 'Focus':
							return _Utils_Tuple2('transform-' + (name + '-focus'), '.transform-' + (name + ('-focus:focus, .se:focus ~ .transform-' + (name + '-focus'))));
						default:
							return _Utils_Tuple2('transform-' + (name + '-active'), '.transform-' + (name + '-active:active'));
					}
				}
			}();
			var classOnElement = _n1.a;
			var classInStylesheet = _n1.b;
			return elm$core$Maybe$Just(
				_Utils_Tuple2(
					classOnElement,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, classInStylesheet, 'transform', transforms)));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$finalize = function (gathered) {
	var addTextShadows = function (_n11) {
		var classes = _n11.a;
		var styles = _n11.b;
		var _n9 = gathered.textShadows;
		if (_n9.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n10 = _n9.a;
			var shadowClass = _n10.a;
			var shades = _n10.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, shadowClass, classes),
				A2(
					elm$core$List$cons,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, '.' + shadowClass, 'text-shadow', shades),
					styles));
		}
	};
	var addBoxShadows = function (_n8) {
		var classes = _n8.a;
		var styles = _n8.b;
		var _n6 = gathered.boxShadows;
		if (_n6.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n7 = _n6.a;
			var shadowClass = _n7.a;
			var shades = _n7.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, shadowClass, classes),
				A2(
					elm$core$List$cons,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, '.' + shadowClass, 'box-shadow', shades),
					styles));
		}
	};
	var add = F2(
		function (_new, _n5) {
			var classes = _n5.a;
			var styles = _n5.b;
			if (_new.$ === 'Nothing') {
				return _Utils_Tuple2(classes, styles);
			} else {
				var _n4 = _new.a;
				var newClass = _n4.a;
				var newStyle = _n4.b;
				return _Utils_Tuple2(
					A2(elm$core$List$cons, newClass, classes),
					A2(elm$core$List$cons, newStyle, styles));
			}
		});
	var addTransform = function (_n2) {
		var classes = _n2.a;
		var styles = _n2.b;
		var _n1 = gathered.transform;
		if (_n1.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var transform = _n1.a;
			return A2(
				add,
				A2(
					elm$core$Maybe$andThen,
					mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
						elm$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Active)),
					transform.active),
				A2(
					add,
					A2(
						elm$core$Maybe$andThen,
						mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
							elm$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Hover)),
						transform.hover),
					A2(
						add,
						A2(
							elm$core$Maybe$andThen,
							mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
								elm$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Focus)),
							transform.focus),
						A2(
							add,
							A2(
								elm$core$Maybe$andThen,
								mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(elm$core$Maybe$Nothing),
								transform.normal),
							_Utils_Tuple2(classes, styles)))));
		}
	};
	var _n0 = addTransform(
		addTextShadows(
			addBoxShadows(
				_Utils_Tuple2(_List_Nil, gathered.styles))));
	var newClasses = _n0.a;
	var newStyles = _n0.b;
	return _Utils_update(
		gathered,
		{
			attributes: A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$vDomClass(
					A2(elm$core$String$join, ' ', newClasses)),
				gathered.attributes),
			styles: newStyles
		});
};
var elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _n0) {
				var trues = _n0.a;
				var falses = _n0.b;
				return pred(x) ? _Utils_Tuple2(
					A2(elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2(elm$core$List$cons, x, falses));
			});
		return A3(
			elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$core$Bitwise$or = _Bitwise_or;
var mdgriffith$stylish_elephants$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Flag$add = F2(
	function (myFlag, _n0) {
		var one = _n0.a;
		var two = _n0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return A2(mdgriffith$stylish_elephants$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2(mdgriffith$stylish_elephants$Internal$Flag$Field, one, second | two);
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$height = mdgriffith$stylish_elephants$Internal$Flag$flag(7);
var mdgriffith$stylish_elephants$Internal$Flag$width = mdgriffith$stylish_elephants$Internal$Flag$flag(6);
var mdgriffith$stylish_elephants$Internal$Flag$xAlign = mdgriffith$stylish_elephants$Internal$Flag$flag(30);
var mdgriffith$stylish_elephants$Internal$Flag$yAlign = mdgriffith$stylish_elephants$Internal$Flag$flag(29);
var mdgriffith$stylish_elephants$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$GridPosition = function (a) {
	return {$: 'GridPosition', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 'GridTemplateStyle', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$PaddingStyle = F4(
	function (a, b, c, d) {
		return {$: 'PaddingStyle', a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 'PseudoSelector', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Shadows = F2(
	function (a, b) {
		return {$: 'Shadows', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$SpacingStyle = F2(
	function (a, b) {
		return {$: 'SpacingStyle', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 'Transparency', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, x, y);
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return mdgriffith$stylish_elephants$Internal$Style$classes.alignedHorizontally + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignLeft);
		case 'Right':
			return mdgriffith$stylish_elephants$Internal$Style$classes.alignedHorizontally + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignRight);
		default:
			return mdgriffith$stylish_elephants$Internal$Style$classes.alignedHorizontally + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX);
	}
};
var mdgriffith$stylish_elephants$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return mdgriffith$stylish_elephants$Internal$Style$classes.alignedVertically + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignTop);
		case 'Bottom':
			return mdgriffith$stylish_elephants$Internal$Style$classes.alignedVertically + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignBottom);
		default:
			return mdgriffith$stylish_elephants$Internal$Style$classes.alignedVertically + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY);
	}
};
var mdgriffith$stylish_elephants$Internal$Model$formatColorClass = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return mdgriffith$stylish_elephants$Internal$Model$floatClass(red) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(green) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(blue) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(alpha))))));
};
var mdgriffith$stylish_elephants$Internal$Model$boxShadowName = function (shadow) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				shadow.inset ? 'box-inset' : 'box-',
				elm$core$String$fromFloat(shadow.offset.a) + 'px',
				elm$core$String$fromFloat(shadow.offset.b) + 'px',
				elm$core$String$fromFloat(shadow.blur) + 'px',
				elm$core$String$fromFloat(shadow.size) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColorClass(shadow.color)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$classNameAttr = function (name) {
	return A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(name));
};
var mdgriffith$stylish_elephants$Internal$Model$formatTextShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				elm$core$String$fromFloat(shadow.offset.a) + 'px',
				elm$core$String$fromFloat(shadow.offset.b) + 'px',
				elm$core$String$fromFloat(shadow.blur) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.color)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$gatherHeight = F2(
	function (h, gathered) {
		gatherHeight:
		while (true) {
			switch (h.$) {
				case 'Px':
					var px = h.a;
					return _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									'height-px-' + elm$core$String$fromInt(px)),
								gathered.attributes),
							styles: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									mdgriffith$stylish_elephants$Internal$Style$dot(
										'height-px-' + elm$core$String$fromInt(px)),
									'height',
									elm$core$String$fromInt(px) + 'px'),
								gathered.styles)
						});
				case 'Content':
					return _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.heightContent),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightContent, gathered.has)
						});
				case 'Fill':
					var portion = h.a;
					return (portion === 1) ? _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.has)
						}) : _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									mdgriffith$stylish_elephants$Internal$Style$classes.heightFillPortion + (' height-fill-' + elm$core$String$fromInt(portion))),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.has),
							styles: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.any + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.column + (' > ' + mdgriffith$stylish_elephants$Internal$Style$dot(
										'height-fill-' + elm$core$String$fromInt(portion)))))),
									'flex-grow',
									elm$core$String$fromInt(portion * 100000)),
								gathered.styles)
						});
				case 'Min':
					var minSize = h.a;
					var len = h.b;
					var _n1 = _Utils_Tuple2(
						'min-height-' + elm$core$String$fromInt(minSize),
						A3(
							mdgriffith$stylish_elephants$Internal$Model$Single,
							'.min-height-' + elm$core$String$fromInt(minSize),
							'min-height',
							elm$core$String$fromInt(minSize) + 'px'));
					var cls = _n1.a;
					var style = _n1.b;
					var newGathered = _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightBetween, gathered.has),
							styles: A2(elm$core$List$cons, style, gathered.styles)
						});
					var $temp$h = len,
						$temp$gathered = newGathered;
					h = $temp$h;
					gathered = $temp$gathered;
					continue gatherHeight;
				default:
					var maxSize = h.a;
					var len = h.b;
					var _n2 = _Utils_Tuple2(
						'max-height-' + elm$core$String$fromInt(maxSize),
						A3(
							mdgriffith$stylish_elephants$Internal$Model$Single,
							'.max-height-' + elm$core$String$fromInt(maxSize),
							'max-height',
							elm$core$String$fromInt(maxSize) + 'px'));
					var cls = _n2.a;
					var style = _n2.b;
					var newGathered = _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightBetween, gathered.has),
							styles: A2(elm$core$List$cons, style, gathered.styles)
						});
					var $temp$h = len,
						$temp$gathered = newGathered;
					h = $temp$h;
					gathered = $temp$gathered;
					continue gatherHeight;
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$gatherWidth = F2(
	function (w, gathered) {
		gatherWidth:
		while (true) {
			switch (w.$) {
				case 'Px':
					var px = w.a;
					return _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									mdgriffith$stylish_elephants$Internal$Style$classes.widthExact + (' width-px-' + elm$core$String$fromInt(px))),
								gathered.attributes),
							styles: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									mdgriffith$stylish_elephants$Internal$Style$dot(
										'width-px-' + elm$core$String$fromInt(px)),
									'width',
									elm$core$String$fromInt(px) + 'px'),
								gathered.styles)
						});
				case 'Content':
					return _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthContent, gathered.has)
						});
				case 'Fill':
					var portion = w.a;
					return (portion === 1) ? _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.has)
						}) : _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									mdgriffith$stylish_elephants$Internal$Style$classes.widthFillPortion + (' width-fill-' + elm$core$String$fromInt(portion))),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.has),
							styles: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.any + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.row + (' > ' + mdgriffith$stylish_elephants$Internal$Style$dot(
										'width-fill-' + elm$core$String$fromInt(portion)))))),
									'flex-grow',
									elm$core$String$fromInt(portion * 100000)),
								gathered.styles)
						});
				case 'Min':
					var minSize = w.a;
					var len = w.b;
					var _n1 = _Utils_Tuple2(
						'min-width-' + elm$core$String$fromInt(minSize),
						A3(
							mdgriffith$stylish_elephants$Internal$Model$Single,
							'.min-width-' + elm$core$String$fromInt(minSize),
							'min-width',
							elm$core$String$fromInt(minSize) + 'px'));
					var cls = _n1.a;
					var style = _n1.b;
					var newGathered = _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthBetween, gathered.has),
							styles: A2(elm$core$List$cons, style, gathered.styles)
						});
					var $temp$w = len,
						$temp$gathered = newGathered;
					w = $temp$w;
					gathered = $temp$gathered;
					continue gatherWidth;
				default:
					var maxSize = w.a;
					var len = w.b;
					var _n2 = _Utils_Tuple2(
						'max-width-' + elm$core$String$fromInt(maxSize),
						A3(
							mdgriffith$stylish_elephants$Internal$Model$Single,
							'.max-width-' + elm$core$String$fromInt(maxSize),
							'max-width',
							elm$core$String$fromInt(maxSize) + 'px'));
					var cls = _n2.a;
					var style = _n2.b;
					var newGathered = _Utils_update(
						gathered,
						{
							attributes: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.attributes),
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthBetween, gathered.has),
							styles: A2(elm$core$List$cons, style, gathered.styles)
						});
					var $temp$w = len,
						$temp$gathered = newGathered;
					w = $temp$w;
					gathered = $temp$gathered;
					continue gatherWidth;
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup = {rotate: elm$core$Maybe$Nothing, scale: elm$core$Maybe$Nothing, translate: elm$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates = {active: elm$core$Maybe$Nothing, focus: elm$core$Maybe$Nothing, hover: elm$core$Maybe$Nothing, normal: elm$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$Rotation = F4(
	function (a, b, c, d) {
		return {$: 'Rotation', a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$addIfNothing = F2(
	function (val, existing) {
		if (existing.$ === 'Nothing') {
			return val;
		} else {
			var x = existing;
			return x;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackTransforms = F2(
	function (transform, group) {
		switch (transform.$) {
			case 'Move':
				var mx = transform.a;
				var my = transform.b;
				var mz = transform.c;
				var _n1 = group.translate;
				if (_n1.$ === 'Nothing') {
					return _Utils_update(
						group,
						{
							translate: elm$core$Maybe$Just(
								_Utils_Tuple3(mx, my, mz))
						});
				} else {
					var _n2 = _n1.a;
					var existingX = _n2.a;
					var existingY = _n2.b;
					var existingZ = _n2.c;
					return _Utils_update(
						group,
						{
							translate: elm$core$Maybe$Just(
								_Utils_Tuple3(
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mx, existingX),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, my, existingY),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mz, existingZ)))
						});
				}
			case 'Rotate':
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				var angle = transform.d;
				return _Utils_update(
					group,
					{
						rotate: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								A4(mdgriffith$stylish_elephants$Internal$Model$Rotation, x, y, z, angle)),
							group.rotate)
					});
			default:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				return _Utils_update(
					group,
					{
						scale: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								_Utils_Tuple3(x, y, z)),
							group.scale)
					});
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackOn = F3(
	function (maybePseudo, transform, gathered) {
		var states = A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates, gathered.transform);
		if (maybePseudo.$ === 'Nothing') {
			var normal = states.normal;
			return _Utils_update(
				gathered,
				{
					transform: elm$core$Maybe$Just(
						_Utils_update(
							states,
							{
								normal: elm$core$Maybe$Just(
									A2(
										mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
										transform,
										A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, normal)))
							}))
				});
		} else {
			switch (maybePseudo.a.$) {
				case 'Hover':
					var _n1 = maybePseudo.a;
					var hover = states.hover;
					return _Utils_update(
						gathered,
						{
							transform: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										hover: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, hover)))
									}))
						});
				case 'Active':
					var _n2 = maybePseudo.a;
					var active = states.active;
					return _Utils_update(
						gathered,
						{
							transform: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										active: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, active)))
									}))
						});
				default:
					var _n3 = maybePseudo.a;
					var focus = states.focus;
					return _Utils_update(
						gathered,
						{
							transform: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										focus: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, focus)))
									}))
						});
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$textShadowName = function (shadow) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				'txt',
				elm$core$String$fromFloat(shadow.offset.a) + 'px',
				elm$core$String$fromFloat(shadow.offset.b) + 'px',
				elm$core$String$fromFloat(shadow.blur) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.color)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$gatherAttributes = F2(
	function (attr, gathered) {
		var styleName = function (name) {
			return '.' + name;
		};
		var formatStyleClass = function (styleType) {
			switch (styleType.$) {
				case 'Transform':
					var x = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$Transform(x);
				case 'Shadows':
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, x, y);
				case 'PseudoSelector':
					var selector = styleType.a;
					var style = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
						selector,
						A2(elm$core$List$map, formatStyleClass, style));
				case 'Style':
					var cls = styleType.a;
					var props = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$Style,
						styleName(cls),
						props);
				case 'Single':
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Single,
						styleName(cls),
						name,
						val);
				case 'Colored':
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Colored,
						styleName(cls),
						name,
						val);
				case 'SpacingStyle':
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, y);
				case 'PaddingStyle':
					var top = styleType.a;
					var right = styleType.b;
					var bottom = styleType.c;
					var left = styleType.d;
					return A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, top, right, bottom, left);
				case 'GridTemplateStyle':
					var grid = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle(grid);
				case 'GridPosition':
					var pos = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridPosition(pos);
				case 'FontFamily':
					var name = styleType.a;
					var fam = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$FontFamily, name, fam);
				case 'FontSize':
					var i = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$FontSize(i);
				default:
					var name = styleType.a;
					var o = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, name, o);
			}
		};
		switch (attr.$) {
			case 'NoAttribute':
				return gathered;
			case 'Class':
				var flag = attr.a;
				var exactClassName = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gathered.has) ? gathered : _Utils_update(
					gathered,
					{
						attributes: A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$classNameAttr(exactClassName),
							gathered.attributes),
						has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gathered.has)
					});
			case 'Attr':
				var attribute = attr.a;
				return _Utils_update(
					gathered,
					{
						attributes: A2(elm$core$List$cons, attribute, gathered.attributes)
					});
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				var addNormalStyle = F2(
					function (styleProp, gatheredProps) {
						return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gatheredProps.has) ? gatheredProps : _Utils_update(
							gatheredProps,
							{
								attributes: function () {
									if (styleProp.$ === 'PseudoSelector') {
										return A2(
											elm$core$List$cons,
											A2(
												elm$virtual_dom$VirtualDom$property,
												'className',
												elm$json$Json$Encode$string(mdgriffith$stylish_elephants$Internal$Style$classes.transition)),
											A2(
												elm$core$List$cons,
												mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
													mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
												gatheredProps.attributes));
									} else {
										return A2(
											elm$core$List$cons,
											mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
												mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
											gatheredProps.attributes);
									}
								}(),
								has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gatheredProps.has),
								styles: A2(
									elm$core$List$cons,
									formatStyleClass(styleProp),
									gatheredProps.styles)
							});
					});
				switch (style.$) {
					case 'Transform':
						var transformation = style.a;
						return A3(mdgriffith$stylish_elephants$Internal$Model$stackOn, elm$core$Maybe$Nothing, transformation, gathered);
					case 'PseudoSelector':
						var pseudo = style.a;
						var props = style.b;
						var forTransforms = function (attribute) {
							if (attribute.$ === 'Transform') {
								var x = attribute.a;
								return elm$core$Maybe$Just(x);
							} else {
								return elm$core$Maybe$Nothing;
							}
						};
						var _n3 = A2(
							elm$core$List$partition,
							function (x) {
								return !_Utils_eq(
									forTransforms(x),
									elm$core$Maybe$Nothing);
							},
							props);
						var transformationProps = _n3.a;
						var otherProps = _n3.b;
						var withTransforms = A3(
							elm$core$List$foldr,
							mdgriffith$stylish_elephants$Internal$Model$stackOn(
								elm$core$Maybe$Just(pseudo)),
							gathered,
							A2(elm$core$List$filterMap, forTransforms, transformationProps));
						return A2(
							addNormalStyle,
							A2(mdgriffith$stylish_elephants$Internal$Model$PseudoSelector, pseudo, otherProps),
							withTransforms);
					default:
						return A2(addNormalStyle, style, gathered);
				}
			case 'Width':
				var width = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.has)) ? A2(
					mdgriffith$stylish_elephants$Internal$Model$gatherWidth,
					width,
					_Utils_update(
						gathered,
						{
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.has)
						})) : gathered;
			case 'Height':
				var height = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.has)) ? A2(
					mdgriffith$stylish_elephants$Internal$Model$gatherHeight,
					height,
					_Utils_update(
						gathered,
						{
							has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.has)
						})) : gathered;
			case 'Describe':
				var description = attr.a;
				switch (description.$) {
					case 'Main':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'main', gathered.node)
							});
					case 'Navigation':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'nav', gathered.node)
							});
					case 'ContentInfo':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'footer', gathered.node)
							});
					case 'Complementary':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'aside', gathered.node)
							});
					case 'Heading':
						var i = description.a;
						return (i <= 1) ? _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h1', gathered.node)
							}) : ((i < 7) ? _Utils_update(
							gathered,
							{
								node: A2(
									mdgriffith$stylish_elephants$Internal$Model$addNodeName,
									'h' + elm$core$String$fromInt(i),
									gathered.node)
							}) : _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h6', gathered.node)
							}));
					case 'Button':
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									gathered.attributes)
							});
					case 'Label':
						var label = description.a;
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									gathered.attributes)
							});
					case 'LivePolite':
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									gathered.attributes)
							});
					default:
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									gathered.attributes)
							});
				}
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				var styles = function () {
					switch (elem.$) {
						case 'Empty':
							return elm$core$Maybe$Nothing;
						case 'Text':
							var str = elem.a;
							return elm$core$Maybe$Nothing;
						case 'Unstyled':
							var html = elem.a;
							return elm$core$Maybe$Nothing;
						default:
							var styled = elem.a;
							return elm$core$Maybe$Just(
								_Utils_ap(gathered.styles, styled.styles));
					}
				}();
				var nearbyElement = A3(
					elm$virtual_dom$VirtualDom$node,
					'div',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							function () {
								switch (location.$) {
									case 'Above':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.above]));
									case 'Below':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.below]));
									case 'OnRight':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.onRight]));
									case 'OnLeft':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.onLeft]));
									case 'InFront':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.inFront]));
									default:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.behind]));
								}
							}())
						]),
					_List_fromArray(
						[
							function () {
							switch (elem.$) {
								case 'Empty':
									return elm$virtual_dom$VirtualDom$text('');
								case 'Text':
									var str = elem.a;
									return mdgriffith$stylish_elephants$Internal$Model$textElement(str);
								case 'Unstyled':
									var html = elem.a;
									return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
								default:
									var styled = elem.a;
									return A2(styled.html, elm$core$Maybe$Nothing, mdgriffith$stylish_elephants$Internal$Model$asEl);
							}
						}()
						]));
				return _Utils_update(
					gathered,
					{
						children: A2(elm$core$List$cons, nearbyElement, gathered.children),
						styles: function () {
							if (styles.$ === 'Nothing') {
								return gathered.styles;
							} else {
								var newStyles = styles.a;
								return newStyles;
							}
						}()
					});
			case 'AlignX':
				var x = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.has)) ? _Utils_update(
					gathered,
					{
						attributes: A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignXName(x)),
							gathered.attributes),
						has: function (flags) {
							switch (x.$) {
								case 'CenterX':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerX, flags);
								case 'Right':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignRight, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.has))
					}) : gathered;
			case 'AlignY':
				var y = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.has)) ? _Utils_update(
					gathered,
					{
						attributes: A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignYName(y)),
							gathered.attributes),
						has: function (flags) {
							switch (y.$) {
								case 'CenterY':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerY, flags);
								case 'Bottom':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignBottom, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.has))
					}) : gathered;
			case 'BoxShadow':
				var shadow = attr.a;
				var _n13 = gathered.boxShadows;
				if (_n13.$ === 'Nothing') {
					return _Utils_update(
						gathered,
						{
							boxShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow)))
						});
				} else {
					var _n14 = _n13.a;
					var existingClass = _n14.a;
					var existing = _n14.b;
					return _Utils_update(
						gathered,
						{
							boxShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow) + (', ' + existing)))
						});
				}
			default:
				var shadow = attr.a;
				var _n15 = gathered.textShadows;
				if (_n15.$ === 'Nothing') {
					return _Utils_update(
						gathered,
						{
							textShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow)))
						});
				} else {
					var _n16 = _n15.a;
					var existingClass = _n16.a;
					var existing = _n16.b;
					return _Utils_update(
						gathered,
						{
							textShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow) + (', ' + existing)))
						});
				}
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$none = A2(mdgriffith$stylish_elephants$Internal$Flag$Field, 0, 0);
var mdgriffith$stylish_elephants$Internal$Model$Generic = {$: 'Generic'};
var mdgriffith$stylish_elephants$Internal$Model$initGathered = function (maybeNodeName) {
	return {
		attributes: _List_Nil,
		boxShadows: elm$core$Maybe$Nothing,
		children: _List_Nil,
		has: mdgriffith$stylish_elephants$Internal$Flag$none,
		node: function () {
			if (maybeNodeName.$ === 'Nothing') {
				return mdgriffith$stylish_elephants$Internal$Model$Generic;
			} else {
				var name = maybeNodeName.a;
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(name);
			}
		}(),
		styles: _List_Nil,
		textShadows: elm$core$Maybe$Nothing,
		transform: elm$core$Maybe$Nothing
	};
};
var mdgriffith$stylish_elephants$Internal$Model$element = F5(
	function (embedMode, context, node, attributes, children) {
		return A4(
			mdgriffith$stylish_elephants$Internal$Model$asElement,
			embedMode,
			children,
			context,
			mdgriffith$stylish_elephants$Internal$Model$finalize(
				A3(
					elm$core$List$foldr,
					mdgriffith$stylish_elephants$Internal$Model$gatherAttributes,
					mdgriffith$stylish_elephants$Internal$Model$initGathered(node),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$contextClasses(context),
						attributes))));
	});
var mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var mdgriffith$stylish_elephants$Internal$Model$noStyleSheet = mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet;
var mdgriffith$stylish_elephants$Element$el = F2(
	function (attrs, child) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var mdgriffith$stylish_elephants$Internal$Model$unstyled = A2(elm$core$Basics$composeL, mdgriffith$stylish_elephants$Internal$Model$Unstyled, elm$core$Basics$always);
var mdgriffith$stylish_elephants$Element$html = mdgriffith$stylish_elephants$Internal$Model$unstyled;
var author$project$Document$viewAsciidoc = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		mdgriffith$stylish_elephants$Element$html(
			author$project$Document$asciidocText(document.content)));
};
var author$project$Document$viewAsciidocLatex = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		mdgriffith$stylish_elephants$Element$html(
			author$project$Document$asciidocText(document.content)));
};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var elm$html$Html$br = _VirtualDom_node('br');
var elm$html$Html$code = _VirtualDom_node('code');
var elm$html$Html$em = _VirtualDom_node('em');
var elm$html$Html$img = _VirtualDom_node('img');
var elm$html$Html$strong = _VirtualDom_node('strong');
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$alt = elm$html$Html$Attributes$stringProperty('alt');
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var pablohirafuji$elm_markdown$Markdown$Inline$Emphasis = F2(
	function (a, b) {
		return {$: 'Emphasis', a: a, b: b};
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var pablohirafuji$elm_markdown$Markdown$Inline$attributeToAttribute = function (_n0) {
	var name = _n0.a;
	var maybeValue = _n0.b;
	return A2(
		elm$html$Html$Attributes$attribute,
		name,
		A2(elm$core$Maybe$withDefault, name, maybeValue));
};
var pablohirafuji$elm_markdown$Markdown$Inline$attributesToHtmlAttributes = elm$core$List$map(pablohirafuji$elm_markdown$Markdown$Inline$attributeToAttribute);
var pablohirafuji$elm_markdown$Markdown$Inline$extractText = function (inlines) {
	return A3(elm$core$List$foldl, pablohirafuji$elm_markdown$Markdown$Inline$extractTextHelp, '', inlines);
};
var pablohirafuji$elm_markdown$Markdown$Inline$extractTextHelp = F2(
	function (inline, text) {
		switch (inline.$) {
			case 'Text':
				var str = inline.a;
				return _Utils_ap(text, str);
			case 'HardLineBreak':
				return text + ' ';
			case 'CodeInline':
				var str = inline.a;
				return _Utils_ap(text, str);
			case 'Link':
				var inlines = inline.c;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 'Image':
				var inlines = inline.c;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 'HtmlInline':
				var inlines = inline.c;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 'Emphasis':
				var inlines = inline.b;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			default:
				var inlines = inline.b;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
		}
	});
var pablohirafuji$elm_markdown$Markdown$Inline$defaultHtml = F2(
	function (customTransformer, inline) {
		var transformer = A2(
			elm$core$Maybe$withDefault,
			pablohirafuji$elm_markdown$Markdown$Inline$defaultHtml(elm$core$Maybe$Nothing),
			customTransformer);
		switch (inline.$) {
			case 'Text':
				var str = inline.a;
				return elm$html$Html$text(str);
			case 'HardLineBreak':
				return A2(elm$html$Html$br, _List_Nil, _List_Nil);
			case 'CodeInline':
				var codeStr = inline.a;
				return A2(
					elm$html$Html$code,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(codeStr)
						]));
			case 'Link':
				var url = inline.a;
				var maybeTitle = inline.b;
				var inlines = inline.c;
				if (maybeTitle.$ === 'Just') {
					var title_ = maybeTitle.a;
					return A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$href(url),
								elm$html$Html$Attributes$title(title_)
							]),
						A2(elm$core$List$map, transformer, inlines));
				} else {
					return A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$href(url)
							]),
						A2(elm$core$List$map, transformer, inlines));
				}
			case 'Image':
				var url = inline.a;
				var maybeTitle = inline.b;
				var inlines = inline.c;
				if (maybeTitle.$ === 'Just') {
					var title_ = maybeTitle.a;
					return A2(
						elm$html$Html$img,
						_List_fromArray(
							[
								elm$html$Html$Attributes$alt(
								pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines)),
								elm$html$Html$Attributes$src(url),
								elm$html$Html$Attributes$title(title_)
							]),
						_List_Nil);
				} else {
					return A2(
						elm$html$Html$img,
						_List_fromArray(
							[
								elm$html$Html$Attributes$alt(
								pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines)),
								elm$html$Html$Attributes$src(url)
							]),
						_List_Nil);
				}
			case 'HtmlInline':
				var tag = inline.a;
				var attrs = inline.b;
				var inlines = inline.c;
				return A3(
					elm$html$Html$node,
					tag,
					pablohirafuji$elm_markdown$Markdown$Inline$attributesToHtmlAttributes(attrs),
					A2(elm$core$List$map, transformer, inlines));
			case 'Emphasis':
				var length = inline.a;
				var inlines = inline.b;
				switch (length) {
					case 1:
						return A2(
							elm$html$Html$em,
							_List_Nil,
							A2(elm$core$List$map, transformer, inlines));
					case 2:
						return A2(
							elm$html$Html$strong,
							_List_Nil,
							A2(elm$core$List$map, transformer, inlines));
					default:
						return ((length - 2) > 0) ? A2(
							elm$html$Html$strong,
							_List_Nil,
							function (a) {
								return A2(elm$core$List$cons, a, _List_Nil);
							}(
								transformer(
									A2(pablohirafuji$elm_markdown$Markdown$Inline$Emphasis, length - 2, inlines)))) : A2(
							elm$html$Html$em,
							_List_Nil,
							A2(elm$core$List$map, transformer, inlines));
				}
			default:
				var inlines = inline.b;
				return elm$html$Html$text('');
		}
	});
var author$project$MarkdownTools$customHtmlInline = function (inline) {
	if (inline.$ === 'Link') {
		var url = inline.a;
		var maybeTitle = inline.b;
		var inlines = inline.c;
		return A2(elm$core$String$startsWith, 'http://elm-lang-yada.org', url) ? A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(url),
					elm$html$Html$Attributes$title(
					A2(elm$core$Maybe$withDefault, '', maybeTitle))
				]),
			A2(elm$core$List$map, author$project$MarkdownTools$customHtmlInline, inlines)) : A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(url),
					elm$html$Html$Attributes$title(
					A2(elm$core$Maybe$withDefault, '', maybeTitle)),
					elm$html$Html$Attributes$target('_blank'),
					elm$html$Html$Attributes$rel('noopener noreferrer')
				]),
			A2(elm$core$List$map, author$project$MarkdownTools$customHtmlInline, inlines));
	} else {
		return A2(
			pablohirafuji$elm_markdown$Markdown$Inline$defaultHtml,
			elm$core$Maybe$Just(author$project$MarkdownTools$customHtmlInline),
			inline);
	}
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$html$Html$blockquote = _VirtualDom_node('blockquote');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$h2 = _VirtualDom_node('h2');
var elm$html$Html$h3 = _VirtualDom_node('h3');
var elm$html$Html$h4 = _VirtualDom_node('h4');
var elm$html$Html$h5 = _VirtualDom_node('h5');
var elm$html$Html$h6 = _VirtualDom_node('h6');
var elm$html$Html$hr = _VirtualDom_node('hr');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$ol = _VirtualDom_node('ol');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$pre = _VirtualDom_node('pre');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$start = function (n) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'start',
		elm$core$String$fromInt(n));
};
var pablohirafuji$elm_markdown$Markdown$Inline$toHtml = pablohirafuji$elm_markdown$Markdown$Inline$defaultHtml(elm$core$Maybe$Nothing);
var pablohirafuji$elm_markdown$Markdown$Block$defaultHtml = F3(
	function (customHtml, customInlineHtml, block) {
		var inlineToHtml = A2(elm$core$Maybe$withDefault, pablohirafuji$elm_markdown$Markdown$Inline$toHtml, customInlineHtml);
		var blockToHtml = A2(
			elm$core$Maybe$withDefault,
			A2(pablohirafuji$elm_markdown$Markdown$Block$defaultHtml, elm$core$Maybe$Nothing, customInlineHtml),
			customHtml);
		switch (block.$) {
			case 'BlankLine':
				return _List_Nil;
			case 'Heading':
				var level = block.b;
				var inlines = block.c;
				var hElement = function () {
					switch (level) {
						case 1:
							return elm$html$Html$h1(_List_Nil);
						case 2:
							return elm$html$Html$h2(_List_Nil);
						case 3:
							return elm$html$Html$h3(_List_Nil);
						case 4:
							return elm$html$Html$h4(_List_Nil);
						case 5:
							return elm$html$Html$h5(_List_Nil);
						default:
							return elm$html$Html$h6(_List_Nil);
					}
				}();
				return _List_fromArray(
					[
						hElement(
						A2(elm$core$List$map, inlineToHtml, inlines))
					]);
			case 'ThematicBreak':
				return _List_fromArray(
					[
						A2(elm$html$Html$hr, _List_Nil, _List_Nil)
					]);
			case 'Paragraph':
				var inlines = block.b;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$p,
						_List_Nil,
						A2(elm$core$List$map, inlineToHtml, inlines))
					]);
			case 'CodeBlock':
				if (block.a.$ === 'Fenced') {
					var _n2 = block.a;
					var model = _n2.b;
					var codeStr = block.b;
					var basicView = function (attrs) {
						return _List_fromArray(
							[
								A2(
								elm$html$Html$pre,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$code,
										attrs,
										_List_fromArray(
											[
												elm$html$Html$text(codeStr)
											]))
									]))
							]);
					};
					var _n3 = model.language;
					if (_n3.$ === 'Just') {
						var language = _n3.a;
						return basicView(
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('language-' + language)
								]));
					} else {
						return basicView(_List_Nil);
					}
				} else {
					var _n4 = block.a;
					var codeStr = block.b;
					return _List_fromArray(
						[
							A2(
							elm$html$Html$pre,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$code,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(codeStr)
										]))
								]))
						]);
				}
			case 'BlockQuote':
				var blocks = block.a;
				return function (a) {
					return A2(elm$core$List$cons, a, _List_Nil);
				}(
					A2(
						elm$html$Html$blockquote,
						_List_Nil,
						elm$core$List$concat(
							A2(elm$core$List$map, blockToHtml, blocks))));
			case 'List':
				var model = block.a;
				var items = block.b;
				return function (a) {
					return A2(elm$core$List$cons, a, _List_Nil);
				}(
					function () {
						var _n5 = model.type_;
						if (_n5.$ === 'Ordered') {
							var startInt = _n5.a;
							return (startInt === 1) ? elm$html$Html$ol(_List_Nil) : elm$html$Html$ol(
								_List_fromArray(
									[
										elm$html$Html$Attributes$start(startInt)
									]));
						} else {
							return elm$html$Html$ul(_List_Nil);
						}
					}()(
						A2(
							elm$core$List$map,
							A2(
								elm$core$Basics$composeR,
								elm$core$List$map(blockToHtml),
								A2(
									elm$core$Basics$composeR,
									elm$core$List$concat,
									elm$html$Html$li(_List_Nil))),
							items)));
			case 'PlainInlines':
				var inlines = block.a;
				return A2(elm$core$List$map, inlineToHtml, inlines);
			default:
				var customBlock = block.a;
				var blocks = block.b;
				return function (a) {
					return A2(elm$core$List$cons, a, _List_Nil);
				}(
					A2(
						elm$html$Html$div,
						_List_Nil,
						A2(
							elm$core$List$cons,
							elm$html$Html$text('Unhandled custom block.'),
							elm$core$List$concat(
								A2(elm$core$List$map, blockToHtml, blocks)))));
		}
	});
var author$project$MarkdownTools$customHtmlBlock = function (block) {
	return A3(
		pablohirafuji$elm_markdown$Markdown$Block$defaultHtml,
		elm$core$Maybe$Just(author$project$MarkdownTools$customHtmlBlock),
		elm$core$Maybe$Just(author$project$MarkdownTools$customHtmlInline),
		block);
};
var author$project$Utility$flattenList = function (stringList) {
	var n = elm$core$List$length(stringList);
	return (n < 2) ? A2(
		elm$core$Maybe$withDefault,
		'',
		elm$core$List$head(stringList)) : A2(elm$core$String$join, '\n', stringList);
};
var author$project$Utility$flattenListList = function (stringListList) {
	return A2(elm$core$List$map, author$project$Utility$flattenList, stringListList);
};
var author$project$Utility$softBreakRegexp = function (width) {
	return A2(
		elm$core$Maybe$withDefault,
		elm$regex$Regex$never,
		elm$regex$Regex$fromString(
			'.{1,' + (elm$core$String$fromInt(width) + '}(\\s+|$)|\\S+?(\\s+|$)')));
};
var elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var author$project$Utility$softBreak = F2(
	function (width, string) {
		return (width <= 0) ? _List_Nil : A2(
			elm$core$List$map,
			function ($) {
				return $.match;
			},
			A2(
				elm$regex$Regex$find,
				author$project$Utility$softBreakRegexp(width),
				string));
	});
var elm$core$String$length = _String_length;
var author$project$Utility$softBreakAltAux = F2(
	function (width, string) {
		return (_Utils_cmp(
			elm$core$String$length(string),
			width) < 0) ? _List_fromArray(
			[string]) : A2(author$project$Utility$softBreak, width, string);
	});
var elm$core$String$lines = _String_lines;
var author$project$Utility$softBreakAlt = F2(
	function (width, string) {
		return author$project$Utility$flattenListList(
			A2(
				elm$core$List$map,
				author$project$Utility$softBreakAltAux(width),
				elm$core$String$lines(string)));
	});
var elm$core$Basics$ge = _Utils_ge;
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return elm$core$Result$Ok(v);
		} else {
			return elm$core$Result$Err(err);
		}
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$regex$Regex$findAtMost = _Regex_findAtMost;
var pablohirafuji$elm_markdown$Markdown$Block$BlockQuote = function (a) {
	return {$: 'BlockQuote', a: a};
};
var pablohirafuji$elm_markdown$Markdown$Block$List = F2(
	function (a, b) {
		return {$: 'List', a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$Paragraph = F2(
	function (a, b) {
		return {$: 'Paragraph', a: a, b: b};
	});
var elm$core$String$slice = _String_slice;
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var pablohirafuji$elm_markdown$Markdown$Block$formatParagraphLine = function (rawParagraph) {
	return (A2(elm$core$String$right, 2, rawParagraph) === '  ') ? (elm$core$String$trim(rawParagraph) + '  ') : elm$core$String$trim(rawParagraph);
};
var pablohirafuji$elm_markdown$Markdown$Block$addToParagraph = F2(
	function (paragraph, rawLine) {
		return A2(
			pablohirafuji$elm_markdown$Markdown$Block$Paragraph,
			paragraph + ('\n' + pablohirafuji$elm_markdown$Markdown$Block$formatParagraphLine(rawLine)),
			_List_Nil);
	});
var pablohirafuji$elm_markdown$Markdown$Block$blockQuoteLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^ {0,3}(?:>[ ]?)(.*)$'));
var elm$regex$Regex$contains = _Regex_contains;
var pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^\\s*$'));
var pablohirafuji$elm_markdown$Markdown$Block$calcListIndentLength = function (_n0) {
	var listBlock = _n0.a;
	var indentSpace = _n0.b;
	var rawLine = _n0.c;
	var indentSpaceLength = elm$core$String$length(indentSpace);
	var isIndentedCode = indentSpaceLength >= 4;
	var updtRawLine = isIndentedCode ? _Utils_ap(indentSpace, rawLine) : rawLine;
	var indentLength = (isIndentedCode || A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, rawLine)) ? (listBlock.indentLength - indentSpaceLength) : listBlock.indentLength;
	return _Utils_Tuple2(
		_Utils_update(
			listBlock,
			{indentLength: indentLength}),
		updtRawLine);
};
var pablohirafuji$elm_markdown$Markdown$Block$atxHeadingLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^ {0,3}(#{1,6})' + ('(?:[ \\t]+[ \\t#]+$|[ \\t]+|$)' + '(.*?)(?:\\s+[ \\t#]*)?$')));
var pablohirafuji$elm_markdown$Markdown$Block$Heading = F3(
	function (a, b, c) {
		return {$: 'Heading', a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Block$extractATXHeadingRM = function (match) {
	var _n0 = match.submatches;
	if ((_n0.b && (_n0.a.$ === 'Just')) && _n0.b.b) {
		var lvl = _n0.a.a;
		var _n1 = _n0.b;
		var maybeHeading = _n1.a;
		return elm$core$Maybe$Just(
			A3(
				pablohirafuji$elm_markdown$Markdown$Block$Heading,
				A2(elm$core$Maybe$withDefault, '', maybeHeading),
				elm$core$String$length(lvl),
				_List_Nil));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$Block$checkATXHeadingLine = function (_n0) {
	var rawLine = _n0.a;
	var ast = _n0.b;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			elm$core$Maybe$map,
			function (a) {
				return A2(elm$core$List$cons, a, ast);
			},
			A2(
				elm$core$Maybe$andThen,
				pablohirafuji$elm_markdown$Markdown$Block$extractATXHeadingRM,
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$atxHeadingLineRegex, rawLine)))));
};
var pablohirafuji$elm_markdown$Markdown$Block$BlankLine = function (a) {
	return {$: 'BlankLine', a: a};
};
var pablohirafuji$elm_markdown$Markdown$Block$CodeBlock = F2(
	function (a, b) {
		return {$: 'CodeBlock', a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$Fenced = F2(
	function (a, b) {
		return {$: 'Fenced', a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$addBlankLineToListBlock = F2(
	function (match, asts) {
		if (!asts.b) {
			return _List_fromArray(
				[
					_List_fromArray(
					[
						pablohirafuji$elm_markdown$Markdown$Block$BlankLine(match.match)
					])
				]);
		} else {
			var ast = asts.a;
			var astsTail = asts.b;
			return A2(
				elm$core$List$cons,
				A2(pablohirafuji$elm_markdown$Markdown$Block$parseBlankLine, ast, match),
				astsTail);
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseBlankLine = F2(
	function (ast, match) {
		_n0$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 'CodeBlock':
						if ((ast.a.a.$ === 'Fenced') && ast.a.a.a) {
							var _n1 = ast.a;
							var _n2 = _n1.a;
							var fence = _n2.b;
							var code = _n1.b;
							var astTail = ast.b;
							return function (a) {
								return A2(elm$core$List$cons, a, astTail);
							}(
								A2(
									pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
									A2(pablohirafuji$elm_markdown$Markdown$Block$Fenced, true, fence),
									code + '\n'));
						} else {
							break _n0$2;
						}
					case 'List':
						var _n3 = ast.a;
						var model = _n3.a;
						var items = _n3.b;
						var astTail = ast.b;
						return A2(
							elm$core$List$cons,
							A2(
								pablohirafuji$elm_markdown$Markdown$Block$List,
								model,
								A2(pablohirafuji$elm_markdown$Markdown$Block$addBlankLineToListBlock, match, items)),
							astTail);
					default:
						break _n0$2;
				}
			} else {
				break _n0$2;
			}
		}
		return A2(
			elm$core$List$cons,
			pablohirafuji$elm_markdown$Markdown$Block$BlankLine(match.match),
			ast);
	});
var pablohirafuji$elm_markdown$Markdown$Block$checkBlankLine = function (_n0) {
	var rawLine = _n0.a;
	var ast = _n0.b;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			elm$core$Maybe$map,
			pablohirafuji$elm_markdown$Markdown$Block$parseBlankLine(ast),
			elm$core$List$head(
				A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, rawLine))));
};
var pablohirafuji$elm_markdown$Markdown$Block$indentedCodeLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^(?: {4,4}| {0,3}\\t)(.*)$'));
var pablohirafuji$elm_markdown$Markdown$Block$Indented = {$: 'Indented'};
var pablohirafuji$elm_markdown$Markdown$Block$blocksAfterBlankLines = F2(
	function (ast, blankLines) {
		blocksAfterBlankLines:
		while (true) {
			if (ast.b && (ast.a.$ === 'BlankLine')) {
				var blankStr = ast.a.a;
				var astTail = ast.b;
				var $temp$ast = astTail,
					$temp$blankLines = A2(elm$core$List$cons, blankStr, blankLines);
				ast = $temp$ast;
				blankLines = $temp$blankLines;
				continue blocksAfterBlankLines;
			} else {
				return _Utils_Tuple2(ast, blankLines);
			}
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph = F2(
	function (rawLine, ast) {
		_n0$3:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 'Paragraph':
						var _n1 = ast.a;
						var paragraph = _n1.a;
						var astTail = ast.b;
						return elm$core$Maybe$Just(
							A2(
								elm$core$List$cons,
								A2(pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, paragraph, rawLine),
								astTail));
					case 'BlockQuote':
						var bqAST = ast.a.a;
						var astTail = ast.b;
						return A2(
							elm$core$Maybe$map,
							function (updtBqAST) {
								return A2(
									elm$core$List$cons,
									pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(updtBqAST),
									astTail);
							},
							A2(pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, rawLine, bqAST));
					case 'List':
						var _n2 = ast.a;
						var model = _n2.a;
						var items = _n2.b;
						var astTail = ast.b;
						if (items.b) {
							var itemAST = items.a;
							var itemASTTail = items.b;
							return A2(
								elm$core$Maybe$map,
								A2(
									elm$core$Basics$composeR,
									function (a) {
										return A2(elm$core$List$cons, a, itemASTTail);
									},
									A2(
										elm$core$Basics$composeR,
										pablohirafuji$elm_markdown$Markdown$Block$List(model),
										function (a) {
											return A2(elm$core$List$cons, a, astTail);
										})),
								A2(pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, rawLine, itemAST));
						} else {
							return elm$core$Maybe$Nothing;
						}
					default:
						break _n0$3;
				}
			} else {
				break _n0$3;
			}
		}
		return elm$core$Maybe$Nothing;
	});
var elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var elm$regex$Regex$replaceAtMost = _Regex_replaceAtMost;
var pablohirafuji$elm_markdown$Markdown$Helpers$tabRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('\\t'));
var pablohirafuji$elm_markdown$Markdown$Helpers$indentLine = function (indentLength_) {
	return A2(
		elm$core$Basics$composeR,
		A2(
			elm$regex$Regex$replace,
			pablohirafuji$elm_markdown$Markdown$Helpers$tabRegex,
			function (_n0) {
				return '    ';
			}),
		A3(
			elm$regex$Regex$replaceAtMost,
			1,
			A2(
				elm$core$Maybe$withDefault,
				elm$regex$Regex$never,
				elm$regex$Regex$fromString(
					'^ {0,' + (elm$core$String$fromInt(indentLength_) + '}'))),
			function (_n1) {
				return '';
			}));
};
var pablohirafuji$elm_markdown$Markdown$Block$resumeIndentedCodeBlock = F2(
	function (codeLine, _n0) {
		var remainBlocks = _n0.a;
		var blankLines = _n0.b;
		if ((remainBlocks.b && (remainBlocks.a.$ === 'CodeBlock')) && (remainBlocks.a.a.$ === 'Indented')) {
			var _n2 = remainBlocks.a;
			var _n3 = _n2.a;
			var codeStr = _n2.b;
			var remainBlocksTail = remainBlocks.b;
			return elm$core$Maybe$Just(
				function (a) {
					return A2(elm$core$List$cons, a, remainBlocksTail);
				}(
					A2(
						pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
						pablohirafuji$elm_markdown$Markdown$Block$Indented,
						function (a) {
							return a + (codeLine + '\n');
						}(
							_Utils_ap(
								codeStr,
								elm$core$String$concat(
									A2(
										elm$core$List$map,
										function (bl) {
											return A2(pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, 4, bl) + '\n';
										},
										blankLines)))))));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseIndentedCodeLine = F2(
	function (ast, codeLine) {
		_n0$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 'CodeBlock':
						if (ast.a.a.$ === 'Indented') {
							var _n1 = ast.a;
							var _n2 = _n1.a;
							var codeStr = _n1.b;
							var astTail = ast.b;
							return function (a) {
								return A2(elm$core$List$cons, a, astTail);
							}(
								A2(pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, pablohirafuji$elm_markdown$Markdown$Block$Indented, codeStr + (codeLine + '\n')));
						} else {
							break _n0$2;
						}
					case 'BlankLine':
						var blankStr = ast.a.a;
						var astTail = ast.b;
						return A2(
							elm$core$Maybe$withDefault,
							function (a) {
								return A2(elm$core$List$cons, a, ast);
							}(
								A2(pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, pablohirafuji$elm_markdown$Markdown$Block$Indented, codeLine + '\n')),
							A2(
								pablohirafuji$elm_markdown$Markdown$Block$resumeIndentedCodeBlock,
								codeLine,
								A2(
									pablohirafuji$elm_markdown$Markdown$Block$blocksAfterBlankLines,
									astTail,
									_List_fromArray(
										[blankStr]))));
					default:
						break _n0$2;
				}
			} else {
				break _n0$2;
			}
		}
		return A2(
			elm$core$Maybe$withDefault,
			function (a) {
				return A2(elm$core$List$cons, a, ast);
			}(
				A2(pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, pablohirafuji$elm_markdown$Markdown$Block$Indented, codeLine + '\n')),
			A2(pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, codeLine, ast));
	});
var pablohirafuji$elm_markdown$Markdown$Block$checkIndentedCode = function (_n0) {
	var rawLine = _n0.a;
	var ast = _n0.b;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			elm$core$Maybe$map,
			pablohirafuji$elm_markdown$Markdown$Block$parseIndentedCodeLine(ast),
			A2(
				elm$core$Maybe$withDefault,
				elm$core$Maybe$Nothing,
				A2(
					elm$core$Maybe$withDefault,
					elm$core$Maybe$Nothing,
					A2(
						elm$core$Maybe$map,
						A2(
							elm$core$Basics$composeR,
							function ($) {
								return $.submatches;
							},
							elm$core$List$head),
						elm$core$List$head(
							A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$indentedCodeLineRegex, rawLine)))))));
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$words = _String_words;
var pablohirafuji$elm_markdown$Markdown$Entity$decimalRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('&#([0-9]{1,8});'));
var elm$core$Char$fromCode = _Char_fromCode;
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$Basics$modBy = _Basics_modBy;
var pablohirafuji$elm_markdown$Markdown$Entity$isBadEndUnicode = function (_int) {
	var remain_ = A2(elm$core$Basics$modBy, 16, _int);
	var remain = A2(elm$core$Basics$modBy, 131070, _int);
	return (_int >= 131070) && ((((0 <= remain) && (remain <= 15)) || ((65536 <= remain) && (remain <= 65551))) && ((remain_ === 14) || (remain_ === 15)));
};
var pablohirafuji$elm_markdown$Markdown$Entity$isValidUnicode = function (_int) {
	return (_int === 9) || ((_int === 10) || ((_int === 13) || ((_int === 133) || (((32 <= _int) && (_int <= 126)) || (((160 <= _int) && (_int <= 55295)) || (((57344 <= _int) && (_int <= 64975)) || (((65008 <= _int) && (_int <= 65533)) || ((65536 <= _int) && (_int <= 1114109)))))))));
};
var pablohirafuji$elm_markdown$Markdown$Entity$validUnicode = function (_int) {
	return (pablohirafuji$elm_markdown$Markdown$Entity$isValidUnicode(_int) && (!pablohirafuji$elm_markdown$Markdown$Entity$isBadEndUnicode(_int))) ? elm$core$String$fromChar(
		elm$core$Char$fromCode(_int)) : elm$core$String$fromChar(
		elm$core$Char$fromCode(65533));
};
var pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimal = function (match) {
	return A2(
		elm$core$Maybe$withDefault,
		match.match,
		A2(
			elm$core$Maybe$map,
			pablohirafuji$elm_markdown$Markdown$Entity$validUnicode,
			A2(
				elm$core$Maybe$andThen,
				elm$core$String$toInt,
				A2(
					elm$core$Maybe$withDefault,
					elm$core$Maybe$Nothing,
					elm$core$List$head(match.submatches)))));
};
var pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimals = A2(elm$regex$Regex$replace, pablohirafuji$elm_markdown$Markdown$Entity$decimalRegex, pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimal);
var pablohirafuji$elm_markdown$Markdown$Entity$entitiesRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('&([0-9a-zA-Z]+);'));
var pablohirafuji$elm_markdown$Markdown$Entity$entities = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('quot', 34),
			_Utils_Tuple2('amp', 38),
			_Utils_Tuple2('apos', 39),
			_Utils_Tuple2('lt', 60),
			_Utils_Tuple2('gt', 62),
			_Utils_Tuple2('nbsp', 160),
			_Utils_Tuple2('iexcl', 161),
			_Utils_Tuple2('cent', 162),
			_Utils_Tuple2('pound', 163),
			_Utils_Tuple2('curren', 164),
			_Utils_Tuple2('yen', 165),
			_Utils_Tuple2('brvbar', 166),
			_Utils_Tuple2('sect', 167),
			_Utils_Tuple2('uml', 168),
			_Utils_Tuple2('copy', 169),
			_Utils_Tuple2('ordf', 170),
			_Utils_Tuple2('laquo', 171),
			_Utils_Tuple2('not', 172),
			_Utils_Tuple2('shy', 173),
			_Utils_Tuple2('reg', 174),
			_Utils_Tuple2('macr', 175),
			_Utils_Tuple2('deg', 176),
			_Utils_Tuple2('plusmn', 177),
			_Utils_Tuple2('sup2', 178),
			_Utils_Tuple2('sup3', 179),
			_Utils_Tuple2('acute', 180),
			_Utils_Tuple2('micro', 181),
			_Utils_Tuple2('para', 182),
			_Utils_Tuple2('middot', 183),
			_Utils_Tuple2('cedil', 184),
			_Utils_Tuple2('sup1', 185),
			_Utils_Tuple2('ordm', 186),
			_Utils_Tuple2('raquo', 187),
			_Utils_Tuple2('frac14', 188),
			_Utils_Tuple2('frac12', 189),
			_Utils_Tuple2('frac34', 190),
			_Utils_Tuple2('iquest', 191),
			_Utils_Tuple2('Agrave', 192),
			_Utils_Tuple2('Aacute', 193),
			_Utils_Tuple2('Acirc', 194),
			_Utils_Tuple2('Atilde', 195),
			_Utils_Tuple2('Auml', 196),
			_Utils_Tuple2('Aring', 197),
			_Utils_Tuple2('AElig', 198),
			_Utils_Tuple2('Ccedil', 199),
			_Utils_Tuple2('Egrave', 200),
			_Utils_Tuple2('Eacute', 201),
			_Utils_Tuple2('Ecirc', 202),
			_Utils_Tuple2('Euml', 203),
			_Utils_Tuple2('Igrave', 204),
			_Utils_Tuple2('Iacute', 205),
			_Utils_Tuple2('Icirc', 206),
			_Utils_Tuple2('Iuml', 207),
			_Utils_Tuple2('ETH', 208),
			_Utils_Tuple2('Ntilde', 209),
			_Utils_Tuple2('Ograve', 210),
			_Utils_Tuple2('Oacute', 211),
			_Utils_Tuple2('Ocirc', 212),
			_Utils_Tuple2('Otilde', 213),
			_Utils_Tuple2('Ouml', 214),
			_Utils_Tuple2('times', 215),
			_Utils_Tuple2('Oslash', 216),
			_Utils_Tuple2('Ugrave', 217),
			_Utils_Tuple2('Uacute', 218),
			_Utils_Tuple2('Ucirc', 219),
			_Utils_Tuple2('Uuml', 220),
			_Utils_Tuple2('Yacute', 221),
			_Utils_Tuple2('THORN', 222),
			_Utils_Tuple2('szlig', 223),
			_Utils_Tuple2('agrave', 224),
			_Utils_Tuple2('aacute', 225),
			_Utils_Tuple2('acirc', 226),
			_Utils_Tuple2('atilde', 227),
			_Utils_Tuple2('auml', 228),
			_Utils_Tuple2('aring', 229),
			_Utils_Tuple2('aelig', 230),
			_Utils_Tuple2('ccedil', 231),
			_Utils_Tuple2('egrave', 232),
			_Utils_Tuple2('eacute', 233),
			_Utils_Tuple2('ecirc', 234),
			_Utils_Tuple2('euml', 235),
			_Utils_Tuple2('igrave', 236),
			_Utils_Tuple2('iacute', 237),
			_Utils_Tuple2('icirc', 238),
			_Utils_Tuple2('iuml', 239),
			_Utils_Tuple2('eth', 240),
			_Utils_Tuple2('ntilde', 241),
			_Utils_Tuple2('ograve', 242),
			_Utils_Tuple2('oacute', 243),
			_Utils_Tuple2('ocirc', 244),
			_Utils_Tuple2('otilde', 245),
			_Utils_Tuple2('ouml', 246),
			_Utils_Tuple2('divide', 247),
			_Utils_Tuple2('oslash', 248),
			_Utils_Tuple2('ugrave', 249),
			_Utils_Tuple2('uacute', 250),
			_Utils_Tuple2('ucirc', 251),
			_Utils_Tuple2('uuml', 252),
			_Utils_Tuple2('yacute', 253),
			_Utils_Tuple2('thorn', 254),
			_Utils_Tuple2('yuml', 255),
			_Utils_Tuple2('OElig', 338),
			_Utils_Tuple2('oelig', 339),
			_Utils_Tuple2('Scaron', 352),
			_Utils_Tuple2('scaron', 353),
			_Utils_Tuple2('Yuml', 376),
			_Utils_Tuple2('fnof', 402),
			_Utils_Tuple2('circ', 710),
			_Utils_Tuple2('tilde', 732),
			_Utils_Tuple2('Alpha', 913),
			_Utils_Tuple2('Beta', 914),
			_Utils_Tuple2('Gamma', 915),
			_Utils_Tuple2('Delta', 916),
			_Utils_Tuple2('Epsilon', 917),
			_Utils_Tuple2('Zeta', 918),
			_Utils_Tuple2('Eta', 919),
			_Utils_Tuple2('Theta', 920),
			_Utils_Tuple2('Iota', 921),
			_Utils_Tuple2('Kappa', 922),
			_Utils_Tuple2('Lambda', 923),
			_Utils_Tuple2('Mu', 924),
			_Utils_Tuple2('Nu', 925),
			_Utils_Tuple2('Xi', 926),
			_Utils_Tuple2('Omicron', 927),
			_Utils_Tuple2('Pi', 928),
			_Utils_Tuple2('Rho', 929),
			_Utils_Tuple2('Sigma', 931),
			_Utils_Tuple2('Tau', 932),
			_Utils_Tuple2('Upsilon', 933),
			_Utils_Tuple2('Phi', 934),
			_Utils_Tuple2('Chi', 935),
			_Utils_Tuple2('Psi', 936),
			_Utils_Tuple2('Omega', 937),
			_Utils_Tuple2('alpha', 945),
			_Utils_Tuple2('beta', 946),
			_Utils_Tuple2('gamma', 947),
			_Utils_Tuple2('delta', 948),
			_Utils_Tuple2('epsilon', 949),
			_Utils_Tuple2('zeta', 950),
			_Utils_Tuple2('eta', 951),
			_Utils_Tuple2('theta', 952),
			_Utils_Tuple2('iota', 953),
			_Utils_Tuple2('kappa', 954),
			_Utils_Tuple2('lambda', 955),
			_Utils_Tuple2('mu', 956),
			_Utils_Tuple2('nu', 957),
			_Utils_Tuple2('xi', 958),
			_Utils_Tuple2('omicron', 959),
			_Utils_Tuple2('pi', 960),
			_Utils_Tuple2('rho', 961),
			_Utils_Tuple2('sigmaf', 962),
			_Utils_Tuple2('sigma', 963),
			_Utils_Tuple2('tau', 964),
			_Utils_Tuple2('upsilon', 965),
			_Utils_Tuple2('phi', 966),
			_Utils_Tuple2('chi', 967),
			_Utils_Tuple2('psi', 968),
			_Utils_Tuple2('omega', 969),
			_Utils_Tuple2('thetasym', 977),
			_Utils_Tuple2('upsih', 978),
			_Utils_Tuple2('piv', 982),
			_Utils_Tuple2('ensp', 8194),
			_Utils_Tuple2('emsp', 8195),
			_Utils_Tuple2('thinsp', 8201),
			_Utils_Tuple2('zwnj', 8204),
			_Utils_Tuple2('zwj', 8205),
			_Utils_Tuple2('lrm', 8206),
			_Utils_Tuple2('rlm', 8207),
			_Utils_Tuple2('ndash', 8211),
			_Utils_Tuple2('mdash', 8212),
			_Utils_Tuple2('lsquo', 8216),
			_Utils_Tuple2('rsquo', 8217),
			_Utils_Tuple2('sbquo', 8218),
			_Utils_Tuple2('ldquo', 8220),
			_Utils_Tuple2('rdquo', 8221),
			_Utils_Tuple2('bdquo', 8222),
			_Utils_Tuple2('dagger', 8224),
			_Utils_Tuple2('Dagger', 8225),
			_Utils_Tuple2('bull', 8226),
			_Utils_Tuple2('hellip', 8230),
			_Utils_Tuple2('permil', 8240),
			_Utils_Tuple2('prime', 8242),
			_Utils_Tuple2('Prime', 8243),
			_Utils_Tuple2('lsaquo', 8249),
			_Utils_Tuple2('rsaquo', 8250),
			_Utils_Tuple2('oline', 8254),
			_Utils_Tuple2('frasl', 8260),
			_Utils_Tuple2('euro', 8364),
			_Utils_Tuple2('image', 8465),
			_Utils_Tuple2('weierp', 8472),
			_Utils_Tuple2('real', 8476),
			_Utils_Tuple2('trade', 8482),
			_Utils_Tuple2('alefsym', 8501),
			_Utils_Tuple2('larr', 8592),
			_Utils_Tuple2('uarr', 8593),
			_Utils_Tuple2('rarr', 8594),
			_Utils_Tuple2('darr', 8595),
			_Utils_Tuple2('harr', 8596),
			_Utils_Tuple2('crarr', 8629),
			_Utils_Tuple2('lArr', 8656),
			_Utils_Tuple2('uArr', 8657),
			_Utils_Tuple2('rArr', 8658),
			_Utils_Tuple2('dArr', 8659),
			_Utils_Tuple2('hArr', 8660),
			_Utils_Tuple2('forall', 8704),
			_Utils_Tuple2('part', 8706),
			_Utils_Tuple2('exist', 8707),
			_Utils_Tuple2('empty', 8709),
			_Utils_Tuple2('nabla', 8711),
			_Utils_Tuple2('isin', 8712),
			_Utils_Tuple2('notin', 8713),
			_Utils_Tuple2('ni', 8715),
			_Utils_Tuple2('prod', 8719),
			_Utils_Tuple2('sum', 8721),
			_Utils_Tuple2('minus', 8722),
			_Utils_Tuple2('lowast', 8727),
			_Utils_Tuple2('radic', 8730),
			_Utils_Tuple2('prop', 8733),
			_Utils_Tuple2('infin', 8734),
			_Utils_Tuple2('ang', 8736),
			_Utils_Tuple2('and', 8743),
			_Utils_Tuple2('or', 8744),
			_Utils_Tuple2('cap', 8745),
			_Utils_Tuple2('cup', 8746),
			_Utils_Tuple2('int', 8747),
			_Utils_Tuple2('there4', 8756),
			_Utils_Tuple2('sim', 8764),
			_Utils_Tuple2('cong', 8773),
			_Utils_Tuple2('asymp', 8776),
			_Utils_Tuple2('ne', 8800),
			_Utils_Tuple2('equiv', 8801),
			_Utils_Tuple2('le', 8804),
			_Utils_Tuple2('ge', 8805),
			_Utils_Tuple2('sub', 8834),
			_Utils_Tuple2('sup', 8835),
			_Utils_Tuple2('nsub', 8836),
			_Utils_Tuple2('sube', 8838),
			_Utils_Tuple2('supe', 8839),
			_Utils_Tuple2('oplus', 8853),
			_Utils_Tuple2('otimes', 8855),
			_Utils_Tuple2('perp', 8869),
			_Utils_Tuple2('sdot', 8901),
			_Utils_Tuple2('lceil', 8968),
			_Utils_Tuple2('rceil', 8969),
			_Utils_Tuple2('lfloor', 8970),
			_Utils_Tuple2('rfloor', 8971),
			_Utils_Tuple2('lang', 9001),
			_Utils_Tuple2('rang', 9002),
			_Utils_Tuple2('loz', 9674),
			_Utils_Tuple2('spades', 9824),
			_Utils_Tuple2('clubs', 9827),
			_Utils_Tuple2('hearts', 9829),
			_Utils_Tuple2('diams', 9830)
		]));
var pablohirafuji$elm_markdown$Markdown$Entity$replaceEntity = function (match) {
	return A2(
		elm$core$Maybe$withDefault,
		match.match,
		A2(
			elm$core$Maybe$map,
			A2(elm$core$Basics$composeR, elm$core$Char$fromCode, elm$core$String$fromChar),
			A2(
				elm$core$Maybe$andThen,
				function (a) {
					return A2(elm$core$Dict$get, a, pablohirafuji$elm_markdown$Markdown$Entity$entities);
				},
				A2(
					elm$core$Maybe$withDefault,
					elm$core$Maybe$Nothing,
					elm$core$List$head(match.submatches)))));
};
var pablohirafuji$elm_markdown$Markdown$Entity$replaceEntities = A2(elm$regex$Regex$replace, pablohirafuji$elm_markdown$Markdown$Entity$entitiesRegex, pablohirafuji$elm_markdown$Markdown$Entity$replaceEntity);
var pablohirafuji$elm_markdown$Markdown$Entity$hexadecimalRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('&#[Xx]([0-9a-fA-F]{1,8});'));
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var pablohirafuji$elm_markdown$Markdown$Entity$hexToInt = A2(
	elm$core$Basics$composeR,
	elm$core$String$toLower,
	A2(
		elm$core$Basics$composeR,
		elm$core$String$toList,
		A2(
			elm$core$List$foldl,
			F2(
				function (hexDigit, _int) {
					return ((_int * 16) + A2(
						elm$core$Basics$modBy,
						39,
						elm$core$Char$toCode(hexDigit))) - 9;
				}),
			0)));
var pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimal = function (match) {
	return A2(
		elm$core$Maybe$withDefault,
		match.match,
		A2(
			elm$core$Maybe$map,
			A2(elm$core$Basics$composeR, pablohirafuji$elm_markdown$Markdown$Entity$hexToInt, pablohirafuji$elm_markdown$Markdown$Entity$validUnicode),
			A2(
				elm$core$Maybe$withDefault,
				elm$core$Maybe$Nothing,
				elm$core$List$head(match.submatches))));
};
var pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimals = A2(elm$regex$Regex$replace, pablohirafuji$elm_markdown$Markdown$Entity$hexadecimalRegex, pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimal);
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var pablohirafuji$elm_markdown$Markdown$Helpers$escapableRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\+)([!\"#$%&\\\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-])'));
var pablohirafuji$elm_markdown$Markdown$Helpers$replaceEscapable = A2(
	elm$regex$Regex$replace,
	pablohirafuji$elm_markdown$Markdown$Helpers$escapableRegex,
	function (regexMatch) {
		var _n0 = regexMatch.submatches;
		if (((_n0.b && (_n0.a.$ === 'Just')) && _n0.b.b) && (_n0.b.a.$ === 'Just')) {
			var backslashes = _n0.a.a;
			var _n1 = _n0.b;
			var escapedStr = _n1.a.a;
			return _Utils_ap(
				A2(
					elm$core$String$repeat,
					(elm$core$String$length(backslashes) / 2) | 0,
					'\\'),
				escapedStr);
		} else {
			return regexMatch.match;
		}
	});
var pablohirafuji$elm_markdown$Markdown$Helpers$formatStr = function (str) {
	return pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimals(
		pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimals(
			pablohirafuji$elm_markdown$Markdown$Entity$replaceEntities(
				pablohirafuji$elm_markdown$Markdown$Helpers$replaceEscapable(str))));
};
var pablohirafuji$elm_markdown$Markdown$Block$extractOpenCodeFenceRM = function (match) {
	var _n0 = match.submatches;
	if (((_n0.b && _n0.b.b) && (_n0.b.a.$ === 'Just')) && _n0.b.b.b) {
		var maybeIndent = _n0.a;
		var _n1 = _n0.b;
		var fence = _n1.a.a;
		var _n2 = _n1.b;
		var maybeLanguage = _n2.a;
		return elm$core$Maybe$Just(
			A2(
				pablohirafuji$elm_markdown$Markdown$Block$Fenced,
				true,
				{
					fenceChar: A2(elm$core$String$left, 1, fence),
					fenceLength: elm$core$String$length(fence),
					indentLength: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Maybe$map, elm$core$String$length, maybeIndent)),
					language: A2(
						elm$core$Maybe$map,
						pablohirafuji$elm_markdown$Markdown$Helpers$formatStr,
						A2(
							elm$core$Maybe$andThen,
							function (lang) {
								return (lang === '') ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(lang);
							},
							elm$core$List$head(
								A2(
									elm$core$Maybe$withDefault,
									_List_Nil,
									A2(elm$core$Maybe$map, elm$core$String$words, maybeLanguage)))))
				}));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$Block$openCodeFenceLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^( {0,3})(`{3,}(?!.*`)|~{3,}(?!.*~))(.*)$'));
var pablohirafuji$elm_markdown$Markdown$Block$checkOpenCodeFenceLine = function (_n0) {
	var rawLine = _n0.a;
	var ast = _n0.b;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			elm$core$Maybe$map,
			function (a) {
				return A2(elm$core$List$cons, a, ast);
			},
			A2(
				elm$core$Maybe$map,
				function (f) {
					return A2(pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, f, '');
				},
				A2(
					elm$core$Maybe$andThen,
					pablohirafuji$elm_markdown$Markdown$Block$extractOpenCodeFenceRM,
					elm$core$List$head(
						A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$openCodeFenceLineRegex, rawLine))))));
};
var pablohirafuji$elm_markdown$Markdown$Block$Ordered = function (a) {
	return {$: 'Ordered', a: a};
};
var pablohirafuji$elm_markdown$Markdown$Block$Unordered = {$: 'Unordered'};
var pablohirafuji$elm_markdown$Markdown$Block$extractOrderedListRM = function (match) {
	var _n0 = match.submatches;
	if (((((((_n0.b && (_n0.a.$ === 'Just')) && _n0.b.b) && (_n0.b.a.$ === 'Just')) && _n0.b.b.b) && (_n0.b.b.a.$ === 'Just')) && _n0.b.b.b.b) && _n0.b.b.b.b.b) {
		var indentString = _n0.a.a;
		var _n1 = _n0.b;
		var start = _n1.a.a;
		var _n2 = _n1.b;
		var delimiter = _n2.a.a;
		var _n3 = _n2.b;
		var maybeIndentSpace = _n3.a;
		var _n4 = _n3.b;
		var maybeRawLine = _n4.a;
		return elm$core$Maybe$Just(
			_Utils_Tuple3(
				{
					delimiter: delimiter,
					indentLength: elm$core$String$length(indentString) + 1,
					isLoose: false,
					type_: A2(
						elm$core$Maybe$withDefault,
						pablohirafuji$elm_markdown$Markdown$Block$Unordered,
						A2(
							elm$core$Maybe$map,
							pablohirafuji$elm_markdown$Markdown$Block$Ordered,
							elm$core$String$toInt(start)))
				},
				A2(elm$core$Maybe$withDefault, '', maybeIndentSpace),
				A2(elm$core$Maybe$withDefault, '', maybeRawLine)));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$Block$orderedListLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^( *(\\d{1,9})([.)])( {0,4}))(?:[ \\t](.*))?$'));
var pablohirafuji$elm_markdown$Markdown$Block$checkOrderedListLine = function (rawLine) {
	return A2(
		elm$core$Result$fromMaybe,
		rawLine,
		A2(
			elm$core$Maybe$andThen,
			pablohirafuji$elm_markdown$Markdown$Block$extractOrderedListRM,
			elm$core$List$head(
				A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$orderedListLineRegex, rawLine))));
};
var pablohirafuji$elm_markdown$Markdown$Block$extractSetextHeadingRM = function (match) {
	var _n0 = match.submatches;
	if (_n0.b && (_n0.a.$ === 'Just')) {
		var delimiter = _n0.a.a;
		return A2(elm$core$String$startsWith, '=', delimiter) ? elm$core$Maybe$Just(
			_Utils_Tuple2(1, delimiter)) : elm$core$Maybe$Just(
			_Utils_Tuple2(2, delimiter));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$Block$parseSetextHeadingLine = F3(
	function (rawLine, ast, _n0) {
		var lvl = _n0.a;
		var delimiter = _n0.b;
		if (ast.b && (ast.a.$ === 'Paragraph')) {
			var _n2 = ast.a;
			var rawText = _n2.a;
			var astTail = ast.b;
			return elm$core$Maybe$Just(
				A2(
					elm$core$List$cons,
					A3(pablohirafuji$elm_markdown$Markdown$Block$Heading, rawText, lvl, _List_Nil),
					astTail));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$setextHeadingLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^ {0,3}(=+|-+)[ \\t]*$'));
var pablohirafuji$elm_markdown$Markdown$Block$checkSetextHeadingLine = function (_n0) {
	var rawLine = _n0.a;
	var ast = _n0.b;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			elm$core$Maybe$andThen,
			A2(pablohirafuji$elm_markdown$Markdown$Block$parseSetextHeadingLine, rawLine, ast),
			A2(
				elm$core$Maybe$andThen,
				pablohirafuji$elm_markdown$Markdown$Block$extractSetextHeadingRM,
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$setextHeadingLineRegex, rawLine)))));
};
var pablohirafuji$elm_markdown$Markdown$Block$ThematicBreak = {$: 'ThematicBreak'};
var pablohirafuji$elm_markdown$Markdown$Block$thematicBreakLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^ {0,3}(?:' + ('(?:\\*[ \\t]*){3,}' + ('|(?:_[ \\t]*){3,}' + '|(?:-[ \\t]*){3,})[ \\t]*$'))));
var pablohirafuji$elm_markdown$Markdown$Block$checkThematicBreakLine = function (_n0) {
	var rawLine = _n0.a;
	var ast = _n0.b;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			elm$core$Maybe$map,
			function (_n1) {
				return A2(elm$core$List$cons, pablohirafuji$elm_markdown$Markdown$Block$ThematicBreak, ast);
			},
			elm$core$List$head(
				A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$thematicBreakLineRegex, rawLine))));
};
var pablohirafuji$elm_markdown$Markdown$Block$extractUnorderedListRM = function (match) {
	var _n0 = match.submatches;
	if ((((((_n0.b && (_n0.a.$ === 'Just')) && _n0.b.b) && (_n0.b.a.$ === 'Just')) && _n0.b.b.b) && _n0.b.b.b.b) && (!_n0.b.b.b.b.b)) {
		var indentString = _n0.a.a;
		var _n1 = _n0.b;
		var delimiter = _n1.a.a;
		var _n2 = _n1.b;
		var maybeIndentSpace = _n2.a;
		var _n3 = _n2.b;
		var maybeRawLine = _n3.a;
		return elm$core$Maybe$Just(
			_Utils_Tuple3(
				{
					delimiter: delimiter,
					indentLength: elm$core$String$length(indentString) + 1,
					isLoose: false,
					type_: pablohirafuji$elm_markdown$Markdown$Block$Unordered
				},
				A2(elm$core$Maybe$withDefault, '', maybeIndentSpace),
				A2(elm$core$Maybe$withDefault, '', maybeRawLine)));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$Block$unorderedListLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^( *([\\*\\-\\+])( {0,4}))(?:[ \\t](.*))?$'));
var pablohirafuji$elm_markdown$Markdown$Block$checkUnorderedListLine = function (rawLine) {
	return A2(
		elm$core$Result$fromMaybe,
		rawLine,
		A2(
			elm$core$Maybe$andThen,
			pablohirafuji$elm_markdown$Markdown$Block$extractUnorderedListRM,
			elm$core$List$head(
				A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$unorderedListLineRegex, rawLine))));
};
var pablohirafuji$elm_markdown$Markdown$Block$closeCodeFenceLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^ {0,3}(`{3,}|~{3,})\\s*$'));
var pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLineHelp = F2(
	function (fence, match) {
		var _n0 = match.submatches;
		if (_n0.b && (_n0.a.$ === 'Just')) {
			var fenceStr = _n0.a.a;
			return (_Utils_cmp(
				elm$core$String$length(fenceStr),
				fence.fenceLength) > -1) && _Utils_eq(
				A2(elm$core$String$left, 1, fenceStr),
				fence.fenceChar);
		} else {
			return false;
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLine = function (fence) {
	return A2(
		elm$core$Basics$composeR,
		A2(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$closeCodeFenceLineRegex),
		A2(
			elm$core$Basics$composeR,
			elm$core$List$head,
			A2(
				elm$core$Basics$composeR,
				elm$core$Maybe$map(
					pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLineHelp(fence)),
				elm$core$Maybe$withDefault(false))));
};
var pablohirafuji$elm_markdown$Markdown$Block$continueOrCloseCodeFence = F3(
	function (fence, previousCode, rawLine) {
		return A2(pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLine, fence, rawLine) ? A2(
			pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
			A2(pablohirafuji$elm_markdown$Markdown$Block$Fenced, false, fence),
			previousCode) : A2(
			pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
			A2(pablohirafuji$elm_markdown$Markdown$Block$Fenced, true, fence),
			previousCode + (A2(pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, fence.indentLength, rawLine) + '\n'));
	});
var pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast = function (items) {
	isBlankLineLast:
	while (true) {
		if (!items.b) {
			return false;
		} else {
			var item = items.a;
			var itemsTail = items.b;
			_n1$3:
			while (true) {
				if (item.b) {
					switch (item.a.$) {
						case 'BlankLine':
							if (!item.b.b) {
								return false;
							} else {
								return true;
							}
						case 'List':
							var _n2 = item.a;
							var items_ = _n2.b;
							var $temp$items = items_;
							items = $temp$items;
							continue isBlankLineLast;
						default:
							break _n1$3;
					}
				} else {
					break _n1$3;
				}
			}
			return false;
		}
	}
};
var pablohirafuji$elm_markdown$Markdown$Block$parseTextLine = F2(
	function (rawLine, ast) {
		return A2(
			elm$core$Maybe$withDefault,
			A2(
				elm$core$List$cons,
				A2(
					pablohirafuji$elm_markdown$Markdown$Block$Paragraph,
					pablohirafuji$elm_markdown$Markdown$Block$formatParagraphLine(rawLine),
					_List_Nil),
				ast),
			A2(pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, rawLine, ast));
	});
var pablohirafuji$elm_markdown$Markdown$Helpers$ifError = F2(
	function (_function, result) {
		if (result.$ === 'Ok') {
			return result;
		} else {
			var err = result.a;
			return _function(err);
		}
	});
var pablohirafuji$elm_markdown$Markdown$Helpers$initSpacesRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^ +'));
var pablohirafuji$elm_markdown$Markdown$Helpers$indentLength = A2(
	elm$core$Basics$composeR,
	A2(
		elm$regex$Regex$replace,
		pablohirafuji$elm_markdown$Markdown$Helpers$tabRegex,
		function (_n0) {
			return '    ';
		}),
	A2(
		elm$core$Basics$composeR,
		A2(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Helpers$initSpacesRegex),
		A2(
			elm$core$Basics$composeR,
			elm$core$List$head,
			A2(
				elm$core$Basics$composeR,
				elm$core$Maybe$map(
					A2(
						elm$core$Basics$composeR,
						function ($) {
							return $.match;
						},
						elm$core$String$length)),
				elm$core$Maybe$withDefault(0)))));
var pablohirafuji$elm_markdown$Markdown$Block$checkBlockQuote = function (_n16) {
	var rawLine = _n16.a;
	var ast = _n16.b;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			elm$core$Maybe$map,
			pablohirafuji$elm_markdown$Markdown$Block$parseBlockQuoteLine(ast),
			A2(
				elm$core$Maybe$map,
				A2(
					elm$core$Basics$composeR,
					function ($) {
						return $.submatches;
					},
					A2(
						elm$core$Basics$composeR,
						elm$core$List$head,
						A2(
							elm$core$Basics$composeR,
							elm$core$Maybe$withDefault(elm$core$Maybe$Nothing),
							elm$core$Maybe$withDefault('')))),
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$blockQuoteLineRegex, rawLine)))));
};
var pablohirafuji$elm_markdown$Markdown$Block$checkListLine = function (_n15) {
	var rawLine = _n15.a;
	var ast = _n15.b;
	return A2(
		elm$core$Result$mapError,
		function (e) {
			return _Utils_Tuple2(e, ast);
		},
		A2(
			elm$core$Result$map,
			A2(pablohirafuji$elm_markdown$Markdown$Block$parseListLine, rawLine, ast),
			A2(
				elm$core$Result$map,
				pablohirafuji$elm_markdown$Markdown$Block$calcListIndentLength,
				A2(
					pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
					pablohirafuji$elm_markdown$Markdown$Block$checkUnorderedListLine,
					pablohirafuji$elm_markdown$Markdown$Block$checkOrderedListLine(rawLine)))));
};
var pablohirafuji$elm_markdown$Markdown$Block$incorporateLine = F2(
	function (rawLine, ast) {
		_n11$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 'CodeBlock':
						if ((ast.a.a.$ === 'Fenced') && ast.a.a.a) {
							var _n12 = ast.a;
							var _n13 = _n12.a;
							var fence = _n13.b;
							var code = _n12.b;
							var astTail = ast.b;
							return function (a) {
								return A2(elm$core$List$cons, a, astTail);
							}(
								A3(pablohirafuji$elm_markdown$Markdown$Block$continueOrCloseCodeFence, fence, code, rawLine));
						} else {
							break _n11$2;
						}
					case 'List':
						var _n14 = ast.a;
						var model = _n14.a;
						var items = _n14.b;
						var astTail = ast.b;
						return (_Utils_cmp(
							pablohirafuji$elm_markdown$Markdown$Helpers$indentLength(rawLine),
							model.indentLength) > -1) ? A5(pablohirafuji$elm_markdown$Markdown$Block$parseIndentedListLine, rawLine, model, items, ast, astTail) : A2(
							elm$core$Result$withDefault,
							A2(pablohirafuji$elm_markdown$Markdown$Block$parseTextLine, rawLine, ast),
							A2(
								pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
								pablohirafuji$elm_markdown$Markdown$Block$checkBlockQuote,
								A2(
									pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
									pablohirafuji$elm_markdown$Markdown$Block$checkATXHeadingLine,
									A2(
										pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
										pablohirafuji$elm_markdown$Markdown$Block$checkSetextHeadingLine,
										A2(
											pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
											pablohirafuji$elm_markdown$Markdown$Block$checkOpenCodeFenceLine,
											A2(
												pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
												pablohirafuji$elm_markdown$Markdown$Block$checkIndentedCode,
												A2(
													pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
													pablohirafuji$elm_markdown$Markdown$Block$checkBlankLine,
													A2(
														pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
														pablohirafuji$elm_markdown$Markdown$Block$checkListLine,
														pablohirafuji$elm_markdown$Markdown$Block$checkThematicBreakLine(
															_Utils_Tuple2(rawLine, ast))))))))));
					default:
						break _n11$2;
				}
			} else {
				break _n11$2;
			}
		}
		return A2(pablohirafuji$elm_markdown$Markdown$Block$parseRawLine, rawLine, ast);
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseBlockQuoteLine = F2(
	function (ast, rawLine) {
		if (ast.b && (ast.a.$ === 'BlockQuote')) {
			var bqAST = ast.a.a;
			var astTail = ast.b;
			return function (a) {
				return A2(elm$core$List$cons, a, astTail);
			}(
				pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(
					A2(pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, rawLine, bqAST)));
		} else {
			return function (a) {
				return A2(elm$core$List$cons, a, ast);
			}(
				pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(
					A2(pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, rawLine, _List_Nil)));
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseIndentedListLine = F5(
	function (rawLine, model, items, ast, astTail) {
		if (!items.b) {
			return function (a) {
				return A2(elm$core$List$cons, a, astTail);
			}(
				A2(
					pablohirafuji$elm_markdown$Markdown$Block$List,
					model,
					function (a) {
						return A2(elm$core$List$cons, a, _List_Nil);
					}(
						function (a) {
							return A2(pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, a, _List_Nil);
						}(
							A2(pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, model.indentLength, rawLine)))));
		} else {
			var item = items.a;
			var itemsTail = items.b;
			var indentedRawLine = A2(pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, model.indentLength, rawLine);
			var updateList = function (model_) {
				return function (a) {
					return A2(elm$core$List$cons, a, astTail);
				}(
					A2(
						pablohirafuji$elm_markdown$Markdown$Block$List,
						model_,
						function (a) {
							return A2(elm$core$List$cons, a, itemsTail);
						}(
							A2(pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, indentedRawLine, item))));
			};
			_n7$3:
			while (true) {
				if (item.b) {
					switch (item.a.$) {
						case 'BlankLine':
							if (!item.b.b) {
								return updateList(model);
							} else {
								var itemTail = item.b;
								return A2(
									elm$core$List$all,
									function (block) {
										if (block.$ === 'BlankLine') {
											return true;
										} else {
											return false;
										}
									},
									itemTail) ? A2(pablohirafuji$elm_markdown$Markdown$Block$parseRawLine, rawLine, ast) : updateList(
									_Utils_update(
										model,
										{isLoose: true}));
							}
						case 'List':
							var _n9 = item.a;
							var model_ = _n9.a;
							var items_ = _n9.b;
							var itemTail = item.b;
							return (_Utils_cmp(
								pablohirafuji$elm_markdown$Markdown$Helpers$indentLength(indentedRawLine),
								model_.indentLength) > -1) ? updateList(model) : (pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast(items_) ? updateList(
								_Utils_update(
									model,
									{isLoose: true})) : updateList(model));
						default:
							break _n7$3;
					}
				} else {
					break _n7$3;
				}
			}
			return updateList(model);
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseListLine = F3(
	function (rawLine, ast, _n0) {
		var listBlock = _n0.a;
		var listRawLine = _n0.b;
		var parsedRawLine = A2(pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, listRawLine, _List_Nil);
		var newList = A2(
			elm$core$List$cons,
			A2(
				pablohirafuji$elm_markdown$Markdown$Block$List,
				listBlock,
				_List_fromArray(
					[parsedRawLine])),
			ast);
		_n1$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 'List':
						var _n2 = ast.a;
						var model = _n2.a;
						var items = _n2.b;
						var astTail = ast.b;
						return _Utils_eq(listBlock.delimiter, model.delimiter) ? function (a) {
							return A2(elm$core$List$cons, a, astTail);
						}(
							A2(
								pablohirafuji$elm_markdown$Markdown$Block$List,
								_Utils_update(
									model,
									{
										indentLength: listBlock.indentLength,
										isLoose: model.isLoose || pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast(items)
									}),
								A2(elm$core$List$cons, parsedRawLine, items))) : newList;
					case 'Paragraph':
						var _n3 = ast.a;
						var rawText = _n3.a;
						var inlines = _n3.b;
						var astTail = ast.b;
						if ((parsedRawLine.b && (parsedRawLine.a.$ === 'BlankLine')) && (!parsedRawLine.b.b)) {
							return A2(
								elm$core$List$cons,
								A2(pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, rawText, rawLine),
								astTail);
						} else {
							var _n5 = listBlock.type_;
							if (_n5.$ === 'Ordered') {
								if (_n5.a === 1) {
									return newList;
								} else {
									var _int = _n5.a;
									return A2(
										elm$core$List$cons,
										A2(pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, rawText, rawLine),
										astTail);
								}
							} else {
								return newList;
							}
						}
					default:
						break _n1$2;
				}
			} else {
				break _n1$2;
			}
		}
		return newList;
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseRawLine = F2(
	function (rawLine, ast) {
		return A2(
			elm$core$Result$withDefault,
			A2(pablohirafuji$elm_markdown$Markdown$Block$parseTextLine, rawLine, ast),
			A2(
				pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
				pablohirafuji$elm_markdown$Markdown$Block$checkListLine,
				A2(
					pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
					pablohirafuji$elm_markdown$Markdown$Block$checkThematicBreakLine,
					A2(
						pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
						pablohirafuji$elm_markdown$Markdown$Block$checkBlockQuote,
						A2(
							pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
							pablohirafuji$elm_markdown$Markdown$Block$checkATXHeadingLine,
							A2(
								pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
								pablohirafuji$elm_markdown$Markdown$Block$checkSetextHeadingLine,
								A2(
									pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
									pablohirafuji$elm_markdown$Markdown$Block$checkOpenCodeFenceLine,
									A2(
										pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
										pablohirafuji$elm_markdown$Markdown$Block$checkIndentedCode,
										pablohirafuji$elm_markdown$Markdown$Block$checkBlankLine(
											_Utils_Tuple2(rawLine, ast))))))))));
	});
var pablohirafuji$elm_markdown$Markdown$Block$incorporateLines = F2(
	function (rawLines, ast) {
		if (!rawLines.b) {
			return ast;
		} else {
			var rawLine = rawLines.a;
			var rawLinesTail = rawLines.b;
			return A2(
				pablohirafuji$elm_markdown$Markdown$Block$incorporateLines,
				rawLinesTail,
				A2(pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, rawLine, ast));
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$Custom = F2(
	function (a, b) {
		return {$: 'Custom', a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$PlainInlines = function (a) {
	return {$: 'PlainInlines', a: a};
};
var pablohirafuji$elm_markdown$Markdown$Config$Sanitize = function (a) {
	return {$: 'Sanitize', a: a};
};
var pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlAttributes = _List_fromArray(
	['name', 'class']);
var pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlElements = _List_fromArray(
	['address', 'article', 'aside', 'b', 'blockquote', 'br', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'dd', 'details', 'div', 'dl', 'dt', 'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'legend', 'li', 'menu', 'menuitem', 'nav', 'ol', 'optgroup', 'option', 'p', 'pre', 'section', 'strike', 'summary', 'small', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']);
var pablohirafuji$elm_markdown$Markdown$Config$defaultSanitizeOptions = {allowedHtmlAttributes: pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlAttributes, allowedHtmlElements: pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlElements};
var pablohirafuji$elm_markdown$Markdown$Config$defaultOptions = {
	rawHtml: pablohirafuji$elm_markdown$Markdown$Config$Sanitize(pablohirafuji$elm_markdown$Markdown$Config$defaultSanitizeOptions),
	softAsHardLineBreak: false
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$initParser = F3(
	function (options, refs, rawText) {
		return {matches: _List_Nil, options: options, rawText: rawText, refs: refs, tokens: _List_Nil};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$CodeInline = function (a) {
	return {$: 'CodeInline', a: a};
};
var pablohirafuji$elm_markdown$Markdown$Inline$HardLineBreak = {$: 'HardLineBreak'};
var pablohirafuji$elm_markdown$Markdown$Inline$HtmlInline = F3(
	function (a, b, c) {
		return {$: 'HtmlInline', a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$Image = F3(
	function (a, b, c) {
		return {$: 'Image', a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$Link = F3(
	function (a, b, c) {
		return {$: 'Link', a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$Text = function (a) {
	return {$: 'Text', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$matchToInline = function (_n0) {
	var match = _n0.a;
	var _n1 = match.type_;
	switch (_n1.$) {
		case 'NormalType':
			return pablohirafuji$elm_markdown$Markdown$Inline$Text(match.text);
		case 'HardLineBreakType':
			return pablohirafuji$elm_markdown$Markdown$Inline$HardLineBreak;
		case 'CodeType':
			return pablohirafuji$elm_markdown$Markdown$Inline$CodeInline(match.text);
		case 'AutolinkType':
			var _n2 = _n1.a;
			var text = _n2.a;
			var url = _n2.b;
			return A3(
				pablohirafuji$elm_markdown$Markdown$Inline$Link,
				url,
				elm$core$Maybe$Nothing,
				_List_fromArray(
					[
						pablohirafuji$elm_markdown$Markdown$Inline$Text(text)
					]));
		case 'LinkType':
			var _n3 = _n1.a;
			var url = _n3.a;
			var maybeTitle = _n3.b;
			return A3(
				pablohirafuji$elm_markdown$Markdown$Inline$Link,
				url,
				maybeTitle,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.matches));
		case 'ImageType':
			var _n4 = _n1.a;
			var url = _n4.a;
			var maybeTitle = _n4.b;
			return A3(
				pablohirafuji$elm_markdown$Markdown$Inline$Image,
				url,
				maybeTitle,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.matches));
		case 'HtmlType':
			var model = _n1.a;
			return A3(
				pablohirafuji$elm_markdown$Markdown$Inline$HtmlInline,
				model.tag,
				model.attributes,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.matches));
		default:
			var length = _n1.a;
			return A2(
				pablohirafuji$elm_markdown$Markdown$Inline$Emphasis,
				length,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.matches));
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines = function (matches) {
	return A2(elm$core$List$map, pablohirafuji$elm_markdown$Markdown$InlineParser$matchToInline, matches);
};
var elm$core$List$sortBy = _List_sortBy;
var pablohirafuji$elm_markdown$Markdown$InlineParser$Match = function (a) {
	return {$: 'Match', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch = F2(
	function (parentMatch, childMatch) {
		return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
			_Utils_update(
				childMatch,
				{end: childMatch.end - parentMatch.textStart, start: childMatch.start - parentMatch.textStart, textEnd: childMatch.textEnd - parentMatch.textStart, textStart: childMatch.textStart - parentMatch.textStart}));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$addChild = F2(
	function (parentMatch, childMatch) {
		return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
			_Utils_update(
				parentMatch,
				{
					matches: A2(
						elm$core$List$cons,
						A2(pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch, parentMatch, childMatch),
						parentMatch.matches)
				}));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatch = F2(
	function (_n0, matches) {
		var match = _n0.a;
		if (!matches.b) {
			return _List_fromArray(
				[
					pablohirafuji$elm_markdown$Markdown$InlineParser$Match(match)
				]);
		} else {
			var prevMatch = matches.a.a;
			var matchesTail = matches.b;
			return (_Utils_cmp(prevMatch.end, match.start) < 1) ? A2(
				elm$core$List$cons,
				pablohirafuji$elm_markdown$Markdown$InlineParser$Match(match),
				matches) : (((_Utils_cmp(prevMatch.start, match.start) < 0) && (_Utils_cmp(prevMatch.end, match.end) > 0)) ? A2(
				elm$core$List$cons,
				A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addChild, prevMatch, match),
				matchesTail) : matches);
		}
	});
function pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches() {
	return A2(
		elm$core$Basics$composeR,
		elm$core$List$sortBy(
			function (_n0) {
				var match = _n0.a;
				return match.start;
			}),
		A2(
			elm$core$Basics$composeR,
			A2(elm$core$List$foldl, pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatch, _List_Nil),
			elm$core$List$map(
				function (_n1) {
					var match = _n1.a;
					return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
						_Utils_update(
							match,
							{
								matches: pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches()(match.matches)
							}));
				})));
}
try {
	var pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches = pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches();
	pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches = function () {
		return pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches;
	};
} catch ($) {
throw 'Some top-level definitions from `Markdown.InlineParser` are causing infinite recursion:\n\n  ┌─────┐\n  │    organizeMatches\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var pablohirafuji$elm_markdown$Markdown$InlineParser$organizeParserMatches = function (model) {
	return _Utils_update(
		model,
		{
			matches: pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches(model.matches)
		});
};
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType = {$: 'NormalType'};
var pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch = function (text) {
	return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
		{
			end: 0,
			matches: _List_Nil,
			start: 0,
			text: pablohirafuji$elm_markdown$Markdown$Helpers$formatStr(text),
			textEnd: 0,
			textStart: 0,
			type_: pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType
		});
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatch = F3(
	function (rawText, _n2, parsedMatches) {
		var matchModel = _n2.a;
		var updtMatch = pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
			_Utils_update(
				matchModel,
				{
					matches: A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches, matchModel.text, _List_Nil, matchModel.matches)
				}));
		if (!parsedMatches.b) {
			var finalStr = A2(elm$core$String$dropLeft, matchModel.end, rawText);
			return elm$core$String$isEmpty(finalStr) ? _List_fromArray(
				[updtMatch]) : _List_fromArray(
				[
					updtMatch,
					pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(finalStr)
				]);
		} else {
			var matchHead = parsedMatches.a.a;
			var matchesTail = parsedMatches.b;
			return _Utils_eq(matchHead.type_, pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType) ? A2(elm$core$List$cons, updtMatch, parsedMatches) : (_Utils_eq(matchModel.end, matchHead.start) ? A2(elm$core$List$cons, updtMatch, parsedMatches) : ((_Utils_cmp(matchModel.end, matchHead.start) < 0) ? A2(
				elm$core$List$cons,
				updtMatch,
				A2(
					elm$core$List$cons,
					pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(
						A3(elm$core$String$slice, matchModel.end, matchHead.start, rawText)),
					parsedMatches)) : parsedMatches));
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches = F3(
	function (rawText, parsedMatches, matches) {
		parseTextMatches:
		while (true) {
			if (!matches.b) {
				if (!parsedMatches.b) {
					return elm$core$String$isEmpty(rawText) ? _List_Nil : _List_fromArray(
						[
							pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(rawText)
						]);
				} else {
					var matchModel = parsedMatches.a.a;
					return (matchModel.start > 0) ? A2(
						elm$core$List$cons,
						pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(
							A2(elm$core$String$left, matchModel.start, rawText)),
						parsedMatches) : parsedMatches;
				}
			} else {
				var match = matches.a;
				var matchesTail = matches.b;
				var $temp$rawText = rawText,
					$temp$parsedMatches = A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatch, rawText, match, parsedMatches),
					$temp$matches = matchesTail;
				rawText = $temp$rawText;
				parsedMatches = $temp$parsedMatches;
				matches = $temp$matches;
				continue parseTextMatches;
			}
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$parseText = function (model) {
	return _Utils_update(
		model,
		{
			matches: A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches, model.rawText, _List_Nil, model.matches)
		});
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketLTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)(\\<)'));
var pablohirafuji$elm_markdown$Markdown$Helpers$isEven = function (_int) {
	return !A2(elm$core$Basics$modBy, 2, _int);
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken = function (a) {
	return {$: 'CharToken', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketLToken = function (regMatch) {
	var _n0 = regMatch.submatches;
	if ((_n0.b && _n0.b.b) && (_n0.b.a.$ === 'Just')) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var delimiter = _n1.a.a;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? elm$core$Maybe$Just(
			{
				index: regMatch.index + backslashesLength,
				length: 1,
				meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken(
					_Utils_chr('<'))
			}) : elm$core$Maybe$Nothing;
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketLTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketLToken,
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketLTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketRTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)(\\>)'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$RightAngleBracket = function (a) {
	return {$: 'RightAngleBracket', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketRToken = function (regMatch) {
	var _n0 = regMatch.submatches;
	if ((_n0.b && _n0.b.b) && (_n0.b.a.$ === 'Just')) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return elm$core$Maybe$Just(
			{
				index: regMatch.index + backslashesLength,
				length: 1,
				meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$RightAngleBracket(
					!pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength))
			});
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketRTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketRToken,
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketRTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$asteriskEmphasisTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)([^*])?(\\*+)([^*])?'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisToken = F2(
	function (a, b) {
		return {$: 'EmphasisToken', a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$punctuationRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('[!-#%-\\*,-/:;\\?@\\[-\\]_\\{\\}]'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$containPunctuation = elm$regex$Regex$contains(pablohirafuji$elm_markdown$Markdown$InlineParser$punctuationRegex);
var pablohirafuji$elm_markdown$Markdown$InlineParser$spaceRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('\\s'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$containSpace = elm$regex$Regex$contains(pablohirafuji$elm_markdown$Markdown$InlineParser$spaceRegex);
var pablohirafuji$elm_markdown$Markdown$InlineParser$charFringeRank = function (_char) {
	var string = elm$core$String$fromChar(_char);
	return pablohirafuji$elm_markdown$Markdown$InlineParser$containSpace(string) ? 0 : (pablohirafuji$elm_markdown$Markdown$InlineParser$containPunctuation(string) ? 1 : 2);
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$maybeCharFringeRank = function (maybeChar) {
	return A2(
		elm$core$Maybe$withDefault,
		0,
		A2(elm$core$Maybe$map, pablohirafuji$elm_markdown$Markdown$InlineParser$charFringeRank, maybeChar));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$getFringeRank = A2(
	elm$core$Basics$composeR,
	elm$core$Maybe$map(
		A2(
			elm$core$Basics$composeR,
			elm$core$String$uncons,
			A2(
				elm$core$Basics$composeR,
				elm$core$Maybe$map(elm$core$Tuple$first),
				pablohirafuji$elm_markdown$Markdown$InlineParser$maybeCharFringeRank))),
	elm$core$Maybe$withDefault(0));
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken = F3(
	function (_char, rawText, regMatch) {
		var _n0 = regMatch.submatches;
		if ((((_n0.b && _n0.b.b) && _n0.b.b.b) && (_n0.b.b.a.$ === 'Just')) && _n0.b.b.b.b) {
			var maybeBackslashes = _n0.a;
			var _n1 = _n0.b;
			var maybeLeftFringe = _n1.a;
			var _n2 = _n1.b;
			var delimiter = _n2.a.a;
			var _n3 = _n2.b;
			var maybeRightFringe = _n3.a;
			var leftFringeLength = A2(
				elm$core$Maybe$withDefault,
				0,
				A2(elm$core$Maybe$map, elm$core$String$length, maybeLeftFringe));
			var mLeftFringe = (regMatch.index && (!leftFringeLength)) ? elm$core$Maybe$Just(
				A3(elm$core$String$slice, regMatch.index - 1, regMatch.index, rawText)) : maybeLeftFringe;
			var backslashesLength = A2(
				elm$core$Maybe$withDefault,
				0,
				A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
			var isEscaped = ((!pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength)) && (!leftFringeLength)) || _Utils_eq(
				mLeftFringe,
				elm$core$Maybe$Just('\\'));
			var delimiterLength = isEscaped ? (elm$core$String$length(delimiter) - 1) : elm$core$String$length(delimiter);
			var fringeRank = _Utils_Tuple2(
				isEscaped ? 1 : pablohirafuji$elm_markdown$Markdown$InlineParser$getFringeRank(mLeftFringe),
				pablohirafuji$elm_markdown$Markdown$InlineParser$getFringeRank(maybeRightFringe));
			var index = ((regMatch.index + backslashesLength) + leftFringeLength) + (isEscaped ? 1 : 0);
			return ((delimiterLength <= 0) || (_Utils_eq(
				_char,
				_Utils_chr('_')) && _Utils_eq(
				fringeRank,
				_Utils_Tuple2(2, 2)))) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
				{
					index: index,
					length: delimiterLength,
					meaning: A2(pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisToken, _char, fringeRank)
				});
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$findAsteriskEmphasisTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		A2(
			pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken,
			_Utils_chr('*'),
			str),
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$asteriskEmphasisTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$codeTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)(\\`+)'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken = function (a) {
	return {$: 'CodeToken', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToCodeToken = function (regMatch) {
	var _n0 = regMatch.submatches;
	if ((_n0.b && _n0.b.b) && (_n0.b.a.$ === 'Just')) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var backtick = _n1.a.a;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return elm$core$Maybe$Just(
			{
				index: regMatch.index + backslashesLength,
				length: elm$core$String$length(backtick),
				meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken(
					!pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength))
			});
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$findCodeTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToCodeToken,
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$codeTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$hardBreakTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(?:(\\\\+)|( {2,}))\\n'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken = {$: 'HardLineBreakToken'};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToHardBreakToken = function (regMatch) {
	var _n0 = regMatch.submatches;
	_n0$2:
	while (true) {
		if (_n0.b) {
			if (_n0.a.$ === 'Just') {
				var backslashes = _n0.a.a;
				var backslashesLength = elm$core$String$length(backslashes);
				return (!pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength)) ? elm$core$Maybe$Just(
					{index: (regMatch.index + backslashesLength) - 1, length: 2, meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken}) : elm$core$Maybe$Nothing;
			} else {
				if (_n0.b.b && (_n0.b.a.$ === 'Just')) {
					var _n1 = _n0.b;
					return elm$core$Maybe$Just(
						{
							index: regMatch.index,
							length: elm$core$String$length(regMatch.match),
							meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken
						});
				} else {
					break _n0$2;
				}
			}
		} else {
			break _n0$2;
		}
	}
	return elm$core$Maybe$Nothing;
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToSoftHardBreakToken = function (regMatch) {
	var _n0 = regMatch.submatches;
	_n0$2:
	while (true) {
		if (_n0.b) {
			if (_n0.a.$ === 'Just') {
				var backslashes = _n0.a.a;
				var backslashesLength = elm$core$String$length(backslashes);
				return pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? elm$core$Maybe$Just(
					{index: regMatch.index + backslashesLength, length: 1, meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken}) : elm$core$Maybe$Just(
					{index: (regMatch.index + backslashesLength) - 1, length: 2, meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken});
			} else {
				if (_n0.b.b) {
					var _n1 = _n0.b;
					var maybeSpaces = _n1.a;
					return elm$core$Maybe$Just(
						{
							index: regMatch.index,
							length: elm$core$String$length(regMatch.match),
							meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken
						});
				} else {
					break _n0$2;
				}
			}
		} else {
			break _n0$2;
		}
	}
	return elm$core$Maybe$Nothing;
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$softAsHardLineBreakTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(?:(\\\\+)|( *))\\n'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$findHardBreakTokens = F2(
	function (softAsHardLineBreak, str) {
		return softAsHardLineBreak ? A2(
			elm$core$List$filterMap,
			pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToSoftHardBreakToken,
			A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$softAsHardLineBreakTokenRegex, str)) : A2(
			elm$core$List$filterMap,
			pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToHardBreakToken,
			A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$hardBreakTokenRegex, str));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageCloseTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)(\\])'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageCloseToken = function (regMatch) {
	var _n0 = regMatch.submatches;
	if ((_n0.b && _n0.b.b) && (_n0.b.a.$ === 'Just')) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var delimiter = _n1.a.a;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? elm$core$Maybe$Just(
			{
				index: regMatch.index + backslashesLength,
				length: 1,
				meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken(
					_Utils_chr(']'))
			}) : elm$core$Maybe$Nothing;
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageCloseTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageCloseToken,
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageCloseTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageOpenTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)(\\!)?(\\[)'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$ImageOpenToken = {$: 'ImageOpenToken'};
var pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken = function (a) {
	return {$: 'LinkOpenToken', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageOpenToken = function (regMatch) {
	var _n0 = regMatch.submatches;
	if (((_n0.b && _n0.b.b) && _n0.b.b.b) && (_n0.b.b.a.$ === 'Just')) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var maybeImageOpen = _n1.a;
		var _n2 = _n1.b;
		var delimiter = _n2.a.a;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		var isEscaped = !pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength);
		var index = (regMatch.index + backslashesLength) + ((isEscaped && _Utils_eq(
			maybeImageOpen,
			elm$core$Maybe$Just('!'))) ? 1 : 0);
		var meaning = isEscaped ? A2(
			elm$core$Maybe$map,
			function (_n3) {
				return pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken(true);
			},
			maybeImageOpen) : elm$core$Maybe$Just(
			A2(
				elm$core$Maybe$withDefault,
				pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken(true),
				A2(
					elm$core$Maybe$map,
					function (_n4) {
						return pablohirafuji$elm_markdown$Markdown$InlineParser$ImageOpenToken;
					},
					maybeImageOpen)));
		var length = _Utils_eq(
			meaning,
			elm$core$Maybe$Just(pablohirafuji$elm_markdown$Markdown$InlineParser$ImageOpenToken)) ? 2 : 1;
		var toModel = function (m) {
			return {index: index, length: length, meaning: m};
		};
		return A2(elm$core$Maybe$map, toModel, meaning);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageOpenTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageOpenToken,
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageOpenTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$underlineEmphasisTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)([^_])?(\\_+)([^_])?'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$findUnderlineEmphasisTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		A2(
			pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken,
			_Utils_chr('_'),
			str),
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$underlineEmphasisTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$tokenize = function (model) {
	return _Utils_update(
		model,
		{
			tokens: A2(
				elm$core$List$sortBy,
				function ($) {
					return $.index;
				},
				_Utils_ap(
					pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketRTokens(model.rawText),
					_Utils_ap(
						pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketLTokens(model.rawText),
						_Utils_ap(
							A2(pablohirafuji$elm_markdown$Markdown$InlineParser$findHardBreakTokens, model.options.softAsHardLineBreak, model.rawText),
							_Utils_ap(
								pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageCloseTokens(model.rawText),
								_Utils_ap(
									pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageOpenTokens(model.rawText),
									_Utils_ap(
										pablohirafuji$elm_markdown$Markdown$InlineParser$findUnderlineEmphasisTokens(model.rawText),
										_Utils_ap(
											pablohirafuji$elm_markdown$Markdown$InlineParser$findAsteriskEmphasisTokens(model.rawText),
											pablohirafuji$elm_markdown$Markdown$InlineParser$findCodeTokens(model.rawText)))))))))
		});
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return elm$core$Maybe$Just(v);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars = ' \\t\\f\\v\\r\\n';
var pablohirafuji$elm_markdown$Markdown$Helpers$whitespacesRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('[' + (pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + ']+')));
var pablohirafuji$elm_markdown$Markdown$Helpers$cleanWhitespaces = A2(
	elm$core$Basics$composeR,
	elm$core$String$trim,
	A2(
		elm$regex$Regex$replace,
		pablohirafuji$elm_markdown$Markdown$Helpers$whitespacesRegex,
		function (_n0) {
			return ' ';
		}));
var pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType = {$: 'CodeType'};
var pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisType = function (a) {
	return {$: 'EmphasisType', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType = function (a) {
	return {$: 'HtmlType', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType = function (a) {
	return {$: 'ImageType', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType = function (a) {
	return {$: 'LinkType', a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch = F2(
	function (model, match) {
		return _Utils_update(
			model,
			{
				matches: A2(elm$core$List$cons, match, model.matches)
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$addToken = F2(
	function (model, token) {
		return _Utils_update(
			model,
			{
				tokens: A2(elm$core$List$cons, token, model.tokens)
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM = F2(
	function (finderFunction, model) {
		return finderFunction(
			_Utils_Tuple2(
				model.tokens,
				_Utils_update(
					model,
					{tokens: _List_Nil})));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType = function (a) {
	return {$: 'AutolinkType', a: a};
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$percentEncode = _Url_percentEncode;
var pablohirafuji$elm_markdown$Markdown$InlineParser$decodeUrlRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('%(?:3B|2C|2F|3F|3A|40|26|3D|2B|24|23|25)'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl = A2(
	elm$core$Basics$composeR,
	elm$url$Url$percentEncode,
	A2(
		elm$regex$Regex$replace,
		pablohirafuji$elm_markdown$Markdown$InlineParser$decodeUrlRegex,
		function (match) {
			return A2(
				elm$core$Maybe$withDefault,
				match.match,
				elm$url$Url$percentDecode(match.match));
		}));
var pablohirafuji$elm_markdown$Markdown$InlineParser$urlRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^([A-Za-z][A-Za-z0-9.+\\-]{1,31}:[^<>\\x00-\\x20]*)$'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$autolinkToMatch = function (_n0) {
	var match = _n0.a;
	return A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$InlineParser$urlRegex, match.text) ? elm$core$Result$Ok(
		pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
			_Utils_update(
				match,
				{
					type_: pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType(
						_Utils_Tuple2(
							match.text,
							pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(match.text)))
				}))) : elm$core$Result$Err(
		pablohirafuji$elm_markdown$Markdown$InlineParser$Match(match));
};
var pablohirafuji$elm_markdown$Markdown$Helpers$titleRegex = '(?:[' + (pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + (']+' + ('(?:\'([^\'\\\\]*(?:\\\\.[^\'\\\\]*)*)\'|' + ('\"([^\"\\\\]*(?:\\\\.[^\"\\\\]*)*)\"|' + '\\(([^\\)\\\\]*(?:\\\\.[^\\)\\\\]*)*)\\)))?'))));
var pablohirafuji$elm_markdown$Markdown$InlineParser$hrefRegex = '(?:<([^<>' + (pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + (']*)>|([^' + (pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + ('\\(\\)\\\\]*(?:\\\\.[^' + (pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + '\\(\\)\\\\]*)*))')))));
var pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^\\(\\s*' + (pablohirafuji$elm_markdown$Markdown$InlineParser$hrefRegex + (pablohirafuji$elm_markdown$Markdown$Helpers$titleRegex + '\\s*\\)'))));
var pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust = function (maybes) {
	var process = F2(
		function (a, maybeFound) {
			if (maybeFound.$ === 'Just') {
				var found = maybeFound.a;
				return elm$core$Maybe$Just(found);
			} else {
				return a;
			}
		});
	return A3(elm$core$List$foldl, process, elm$core$Maybe$Nothing, maybes);
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle = function (_n0) {
	var rawUrl = _n0.a;
	var maybeTitle = _n0.b;
	return _Utils_Tuple2(
		pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(
			pablohirafuji$elm_markdown$Markdown$Helpers$formatStr(rawUrl)),
		A2(elm$core$Maybe$map, pablohirafuji$elm_markdown$Markdown$Helpers$formatStr, maybeTitle));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegexToMatch = F3(
	function (matchModel, model, regexMatch) {
		var _n0 = regexMatch.submatches;
		if ((((_n0.b && _n0.b.b) && _n0.b.b.b) && _n0.b.b.b.b) && _n0.b.b.b.b.b) {
			var maybeRawUrlAngleBrackets = _n0.a;
			var _n1 = _n0.b;
			var maybeRawUrlWithoutBrackets = _n1.a;
			var _n2 = _n1.b;
			var maybeTitleSingleQuotes = _n2.a;
			var _n3 = _n2.b;
			var maybeTitleDoubleQuotes = _n3.a;
			var _n4 = _n3.b;
			var maybeTitleParenthesis = _n4.a;
			var maybeTitle = pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
				_List_fromArray(
					[maybeTitleSingleQuotes, maybeTitleDoubleQuotes, maybeTitleParenthesis]));
			var toMatch = function (rawUrl) {
				return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
					_Utils_update(
						matchModel,
						{
							end: matchModel.end + elm$core$String$length(regexMatch.match),
							type_: function () {
								var _n5 = matchModel.type_;
								if (_n5.$ === 'ImageType') {
									return pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType;
								} else {
									return pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType;
								}
							}()(
								pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle(
									_Utils_Tuple2(rawUrl, maybeTitle)))
						}));
			};
			var maybeRawUrl = pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
				_List_fromArray(
					[maybeRawUrlAngleBrackets, maybeRawUrlWithoutBrackets]));
			return elm$core$Maybe$Just(
				toMatch(
					A2(elm$core$Maybe$withDefault, '', maybeRawUrl)));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$checkForInlineLinkTypeOrImageType = function (_n0) {
	var remainText = _n0.a;
	var tempMatch = _n0.b.a;
	var model = _n0.c;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple3(
			remainText,
			pablohirafuji$elm_markdown$Markdown$InlineParser$Match(tempMatch),
			model),
		A2(
			elm$core$Maybe$map,
			pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch(model),
			A2(
				elm$core$Maybe$andThen,
				A2(pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegexToMatch, tempMatch, model),
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegex, remainText)))));
};
var pablohirafuji$elm_markdown$Markdown$Helpers$insideSquareBracketRegex = '[^\\[\\]\\\\]*(?:\\\\.[^\\[\\]\\\\]*)*';
var pablohirafuji$elm_markdown$Markdown$InlineParser$refLabelRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^\\[\\s*(' + (pablohirafuji$elm_markdown$Markdown$Helpers$insideSquareBracketRegex + ')\\s*\\]')));
var pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel = A2(elm$core$Basics$composeR, pablohirafuji$elm_markdown$Markdown$Helpers$cleanWhitespaces, elm$core$String$toLower);
var pablohirafuji$elm_markdown$Markdown$InlineParser$refRegexToMatch = F3(
	function (matchModel, model, maybeRegexMatch) {
		var regexMatchLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(
				elm$core$Maybe$map,
				A2(
					elm$core$Basics$composeR,
					function ($) {
						return $.match;
					},
					elm$core$String$length),
				maybeRegexMatch));
		var toMatch = function (urlTitle) {
			return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
				_Utils_update(
					matchModel,
					{
						end: matchModel.end + regexMatchLength,
						type_: function () {
							var _n0 = matchModel.type_;
							if (_n0.$ === 'ImageType') {
								return pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType;
							} else {
								return pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType;
							}
						}()(
							pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle(urlTitle))
					}));
		};
		var refLabel = function (str) {
			return elm$core$String$isEmpty(str) ? matchModel.text : str;
		}(
			A2(
				elm$core$Maybe$withDefault,
				matchModel.text,
				A2(
					elm$core$Maybe$withDefault,
					elm$core$Maybe$Nothing,
					A2(
						elm$core$Maybe$withDefault,
						elm$core$Maybe$Nothing,
						A2(
							elm$core$Maybe$map,
							A2(
								elm$core$Basics$composeR,
								function ($) {
									return $.submatches;
								},
								elm$core$List$head),
							maybeRegexMatch)))));
		var maybeRefItem = A2(
			elm$core$Dict$get,
			pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel(refLabel),
			model.refs);
		return A2(elm$core$Maybe$map, toMatch, maybeRefItem);
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType = function (_n0) {
	var remainText = _n0.a;
	var tempMatch = _n0.b.a;
	var model = _n0.c;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple3(
			remainText,
			pablohirafuji$elm_markdown$Markdown$InlineParser$Match(tempMatch),
			model),
		A2(
			elm$core$Maybe$map,
			pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch(model),
			A3(
				pablohirafuji$elm_markdown$Markdown$InlineParser$refRegexToMatch,
				tempMatch,
				model,
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$InlineParser$refLabelRegex, remainText)))));
};
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$checkParsedAheadOverlapping = function (parser) {
	var _n0 = parser.matches;
	if (!_n0.b) {
		return elm$core$Result$Err(_Utils_Tuple0);
	} else {
		var match = _n0.a.a;
		var remainMatches = _n0.b;
		var overlappingMatches = A2(
			elm$core$List$filter,
			function (_n1) {
				var testMatch = _n1.a;
				return (_Utils_cmp(match.end, testMatch.start) > 0) && (_Utils_cmp(match.end, testMatch.end) < 0);
			},
			remainMatches);
		return (elm$core$List$isEmpty(remainMatches) || elm$core$List$isEmpty(overlappingMatches)) ? elm$core$Result$Ok(parser) : elm$core$Result$Err(_Utils_Tuple0);
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$emailRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^([a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~\\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?)*)$'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$emailAutolinkTypeToMatch = function (_n0) {
	var match = _n0.a;
	return A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$InlineParser$emailRegex, match.text) ? elm$core$Result$Ok(
		pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
			_Utils_update(
				match,
				{
					type_: pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType(
						_Utils_Tuple2(
							match.text,
							'mailto:' + pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(match.text)))
				}))) : elm$core$Result$Err(
		pablohirafuji$elm_markdown$Markdown$InlineParser$Match(match));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$filterTokens = F2(
	function (filter, model) {
		return _Utils_update(
			model,
			{
				tokens: A2(elm$core$List$filter, filter, model.tokens)
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$findToken = F2(
	function (isToken, tokens) {
		var search = F2(
			function (token, _n2) {
				var maybeToken = _n2.a;
				var innerTokens = _n2.b;
				var remainTokens = _n2.c;
				if (maybeToken.$ === 'Nothing') {
					return isToken(token) ? _Utils_Tuple3(
						elm$core$Maybe$Just(token),
						innerTokens,
						_List_Nil) : _Utils_Tuple3(
						elm$core$Maybe$Nothing,
						A2(elm$core$List$cons, token, innerTokens),
						_List_Nil);
				} else {
					return _Utils_Tuple3(
						maybeToken,
						innerTokens,
						A2(elm$core$List$cons, token, remainTokens));
				}
			});
		var _return = function (_n0) {
			var maybeToken = _n0.a;
			var innerTokens = _n0.b;
			var remainTokens = _n0.c;
			return A2(
				elm$core$Maybe$map,
				function (token) {
					return _Utils_Tuple3(
						token,
						elm$core$List$reverse(innerTokens),
						elm$core$List$reverse(remainTokens));
				},
				maybeToken);
		};
		return _return(
			A3(
				elm$core$List$foldl,
				search,
				_Utils_Tuple3(elm$core$Maybe$Nothing, _List_Nil, _List_Nil),
				tokens));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlModel = F2(
	function (tag, attributes) {
		return {attributes: attributes, tag: tag};
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlToken = F2(
	function (a, b) {
		return {$: 'HtmlToken', a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$attributesFromRegex = function (regexMatch) {
	var _n0 = regexMatch.submatches;
	_n0$2:
	while (true) {
		if (_n0.b && (_n0.a.$ === 'Just')) {
			if (_n0.a.a === '') {
				return elm$core$Maybe$Nothing;
			} else {
				if ((_n0.b.b && _n0.b.b.b) && _n0.b.b.b.b) {
					var name = _n0.a.a;
					var _n1 = _n0.b;
					var maybeDoubleQuotes = _n1.a;
					var _n2 = _n1.b;
					var maybeSingleQuotes = _n2.a;
					var _n3 = _n2.b;
					var maybeUnquoted = _n3.a;
					var maybeValue = pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
						_List_fromArray(
							[maybeDoubleQuotes, maybeSingleQuotes, maybeUnquoted]));
					return elm$core$Maybe$Just(
						_Utils_Tuple2(name, maybeValue));
				} else {
					break _n0$2;
				}
			}
		} else {
			break _n0$2;
		}
	}
	return elm$core$Maybe$Nothing;
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$htmlAttributesRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('([a-zA-Z:_][a-zA-Z0-9\\-_.:]*)(?: ?= ?(?:\"([^\"]*)\"|\'([^\']*)\'|([^\\s\"\'=<>`]*)))?'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$applyAttributesRegex = A2(
	elm$core$Basics$composeR,
	elm$regex$Regex$find(pablohirafuji$elm_markdown$Markdown$InlineParser$htmlAttributesRegex),
	elm$core$List$filterMap(pablohirafuji$elm_markdown$Markdown$InlineParser$attributesFromRegex));
var pablohirafuji$elm_markdown$Markdown$InlineParser$htmlFromRegex = F3(
	function (model, match, regexMatch) {
		var _n0 = regexMatch.submatches;
		if ((((_n0.b && _n0.b.b) && (_n0.b.a.$ === 'Just')) && _n0.b.b.b) && _n0.b.b.b.b) {
			var maybeClose = _n0.a;
			var _n1 = _n0.b;
			var tag = _n1.a.a;
			var _n2 = _n1.b;
			var maybeAttributes = _n2.a;
			var _n3 = _n2.b;
			var maybeSelfClosing = _n3.a;
			var updateModel = function (attrs) {
				return A2(
					pablohirafuji$elm_markdown$Markdown$InlineParser$addToken,
					model,
					{
						index: match.start,
						length: match.end - match.start,
						meaning: A2(
							pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlToken,
							_Utils_eq(maybeClose, elm$core$Maybe$Nothing) && _Utils_eq(maybeSelfClosing, elm$core$Maybe$Nothing),
							A2(pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlModel, tag, attrs))
					});
			};
			var filterAttributes = F2(
				function (attrs, allowed) {
					return A2(
						elm$core$List$filter,
						function (attr) {
							return A2(elm$core$List$member, attr.a, allowed);
						},
						attrs);
				});
			var attributes = A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				A2(elm$core$Maybe$map, pablohirafuji$elm_markdown$Markdown$InlineParser$applyAttributesRegex, maybeAttributes));
			var noAttributesInCloseTag = _Utils_eq(maybeClose, elm$core$Maybe$Nothing) || ((!_Utils_eq(maybeClose, elm$core$Maybe$Nothing)) && _Utils_eq(attributes, _List_Nil));
			var _n4 = model.options.rawHtml;
			switch (_n4.$) {
				case 'ParseUnsafe':
					return noAttributesInCloseTag ? elm$core$Maybe$Just(
						updateModel(attributes)) : elm$core$Maybe$Nothing;
				case 'Sanitize':
					var allowedHtmlElements = _n4.a.allowedHtmlElements;
					var allowedHtmlAttributes = _n4.a.allowedHtmlAttributes;
					return (A2(elm$core$List$member, tag, allowedHtmlElements) && noAttributesInCloseTag) ? elm$core$Maybe$Just(
						updateModel(
							A2(filterAttributes, attributes, allowedHtmlAttributes))) : elm$core$Maybe$Nothing;
				default:
					return elm$core$Maybe$Nothing;
			}
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$htmlRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^(\\/)?([a-zA-Z][a-zA-Z0-9\\-]*)(?:\\s+([^<>]*?))?(\\/)?$'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$htmlToToken = F2(
	function (model, _n0) {
		var match = _n0.a;
		var _n1 = model.options.rawHtml;
		if (_n1.$ === 'DontParse') {
			return elm$core$Maybe$Nothing;
		} else {
			return A2(
				elm$core$Maybe$andThen,
				A2(pablohirafuji$elm_markdown$Markdown$InlineParser$htmlFromRegex, model, match),
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$InlineParser$htmlRegex, match.text)));
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$isCloseToken = F2(
	function (htmlModel, token) {
		var _n0 = token.meaning;
		if ((_n0.$ === 'HtmlToken') && (!_n0.a)) {
			var htmlModel_ = _n0.b;
			return _Utils_eq(htmlModel.tag, htmlModel_.tag);
		} else {
			return false;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$isCodeTokenPair = F2(
	function (closeToken, openToken) {
		var _n0 = openToken.meaning;
		if (_n0.$ === 'CodeToken') {
			var isEscaped = _n0.a;
			return isEscaped ? _Utils_eq(openToken.length - 1, closeToken.length) : _Utils_eq(openToken.length, closeToken.length);
		} else {
			return false;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$isLinkTypeOrImageOpenToken = function (token) {
	var _n0 = token.meaning;
	switch (_n0.$) {
		case 'LinkOpenToken':
			return true;
		case 'ImageOpenToken':
			return true;
		default:
			return false;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$isOpenEmphasisToken = F2(
	function (closeToken, openToken) {
		var _n0 = openToken.meaning;
		if (_n0.$ === 'EmphasisToken') {
			var openChar = _n0.a;
			var _n1 = _n0.b;
			var openLR = _n1.a;
			var openRR = _n1.b;
			var _n2 = closeToken.meaning;
			if (_n2.$ === 'EmphasisToken') {
				var closeChar = _n2.a;
				var _n3 = _n2.b;
				var closeLR = _n3.a;
				var closeRR = _n3.b;
				return _Utils_eq(openChar, closeChar) ? ((_Utils_eq(openLR, openRR) || _Utils_eq(closeLR, closeRR)) ? A2(elm$core$Basics$modBy, 3, closeToken.length + openToken.length) : true) : false;
			} else {
				return false;
			}
		} else {
			return false;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$voidHtmlTags = _List_fromArray(
	['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
var pablohirafuji$elm_markdown$Markdown$InlineParser$isVoidTag = function (htmlModel) {
	return A2(elm$core$List$member, htmlModel.tag, pablohirafuji$elm_markdown$Markdown$InlineParser$voidHtmlTags);
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakType = {$: 'HardLineBreakType'};
var pablohirafuji$elm_markdown$Markdown$InlineParser$SoftLineBreakToken = {$: 'SoftLineBreakToken'};
var pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens = function (model) {
	return _Utils_update(
		model,
		{
			tokens: elm$core$List$reverse(model.tokens)
		});
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch = F2(
	function (token, type_) {
		return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
			{end: token.index + token.length, matches: _List_Nil, start: token.index, text: '', textEnd: 0, textStart: 0, type_: type_});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$lineBreakTTM = function (_n0) {
	lineBreakTTM:
	while (true) {
		var tokens = _n0.a;
		var model = _n0.b;
		if (!tokens.b) {
			return pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			if (_Utils_eq(token.meaning, pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken) || (_Utils_eq(token.meaning, pablohirafuji$elm_markdown$Markdown$InlineParser$SoftLineBreakToken) && model.options.softAsHardLineBreak)) {
				return pablohirafuji$elm_markdown$Markdown$InlineParser$lineBreakTTM(
					function (b) {
						return _Utils_Tuple2(tokensTail, b);
					}(
						_Utils_update(
							model,
							{
								matches: A2(
									elm$core$List$cons,
									A2(pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch, token, pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakType),
									model.matches)
							})));
			} else {
				var $temp$_n0 = _Utils_Tuple2(
					tokensTail,
					A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_n0 = $temp$_n0;
				continue lineBreakTTM;
			}
		}
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$removeParsedAheadTokens = F2(
	function (tokensTail, parser) {
		var _n0 = parser.matches;
		if (!_n0.b) {
			return _Utils_Tuple2(tokensTail, parser);
		} else {
			var match = _n0.a.a;
			return _Utils_Tuple2(
				A2(
					elm$core$List$filter,
					function (token) {
						return _Utils_cmp(token.index, match.end) > -1;
					},
					tokensTail),
				parser);
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketsToMatch = F4(
	function (closeToken, isEscaped, model, _n24) {
		var openToken = _n24.a;
		var remainTokens = _n24.c;
		return function (result) {
			if (result.$ === 'Err') {
				var tempMatch = result.a;
				return (!isEscaped) ? A2(
					pablohirafuji$elm_markdown$Markdown$InlineParser$htmlToToken,
					_Utils_update(
						model,
						{tokens: remainTokens}),
					tempMatch) : elm$core$Result$toMaybe(result);
			} else {
				return elm$core$Result$toMaybe(result);
			}
		}(
			A2(
				elm$core$Result$map,
				function (newMatch) {
					return _Utils_update(
						model,
						{
							matches: A2(elm$core$List$cons, newMatch, model.matches),
							tokens: remainTokens
						});
				},
				A2(
					pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
					pablohirafuji$elm_markdown$Markdown$InlineParser$emailAutolinkTypeToMatch,
					pablohirafuji$elm_markdown$Markdown$InlineParser$autolinkToMatch(
						A6(
							pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
							model,
							function (s) {
								return s;
							},
							pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType,
							openToken,
							closeToken,
							_List_Nil)))));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM = function (_n21) {
	codeAutolinkTypeHtmlTagTTM:
	while (true) {
		var tokens = _n21.a;
		var model = _n21.b;
		if (!tokens.b) {
			return pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _n23 = token.meaning;
			switch (_n23.$) {
				case 'CodeToken':
					var isEscaped = _n23.a;
					return pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM(
						function (b) {
							return _Utils_Tuple2(tokensTail, b);
						}(
							A2(
								elm$core$Maybe$withDefault,
								A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token),
								A2(
									elm$core$Maybe$map,
									A2(pablohirafuji$elm_markdown$Markdown$InlineParser$codeToMatch, token, model),
									A2(
										pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
										pablohirafuji$elm_markdown$Markdown$InlineParser$isCodeTokenPair(token),
										model.tokens)))));
				case 'RightAngleBracket':
					var isEscaped = _n23.a;
					return pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM(
						function (b) {
							return _Utils_Tuple2(tokensTail, b);
						}(
							A2(
								pablohirafuji$elm_markdown$Markdown$InlineParser$filterTokens,
								A2(
									elm$core$Basics$composeR,
									function ($) {
										return $.meaning;
									},
									elm$core$Basics$neq(
										pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken(
											_Utils_chr('<')))),
								A2(
									elm$core$Maybe$withDefault,
									model,
									A2(
										elm$core$Maybe$andThen,
										A3(pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketsToMatch, token, isEscaped, model),
										A2(
											pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
											A2(
												elm$core$Basics$composeR,
												function ($) {
													return $.meaning;
												},
												elm$core$Basics$eq(
													pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken(
														_Utils_chr('<')))),
											model.tokens))))));
				default:
					var $temp$_n21 = _Utils_Tuple2(
						tokensTail,
						A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
					_n21 = $temp$_n21;
					continue codeAutolinkTypeHtmlTagTTM;
			}
		}
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$codeToMatch = F3(
	function (closeToken, model, _n20) {
		var openToken = _n20.a;
		var remainTokens = _n20.c;
		var updtOpenToken = _Utils_eq(
			openToken.meaning,
			pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken(true)) ? _Utils_update(
			openToken,
			{index: openToken.index + 1, length: openToken.length - 1}) : openToken;
		return _Utils_update(
			model,
			{
				matches: A2(
					elm$core$List$cons,
					A6(pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch, model, pablohirafuji$elm_markdown$Markdown$Helpers$cleanWhitespaces, pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType, updtOpenToken, closeToken, _List_Nil),
					model.matches),
				tokens: remainTokens
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM = function (_n16) {
	emphasisTTM:
	while (true) {
		var tokens = _n16.a;
		var model = _n16.b;
		if (!tokens.b) {
			return pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _n18 = token.meaning;
			if (_n18.$ === 'EmphasisToken') {
				var _char = _n18.a;
				var _n19 = _n18.b;
				var leftRank = _n19.a;
				var rightRank = _n19.b;
				if (_Utils_eq(leftRank, rightRank)) {
					if (rightRank && ((!_Utils_eq(
						_char,
						_Utils_chr('_'))) || (rightRank === 1))) {
						return pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM(
							A2(
								elm$core$Maybe$withDefault,
								_Utils_Tuple2(
									tokensTail,
									A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token)),
								A2(
									elm$core$Maybe$map,
									A3(pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisToMatch, token, tokensTail, model),
									A2(
										pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
										pablohirafuji$elm_markdown$Markdown$InlineParser$isOpenEmphasisToken(token),
										model.tokens))));
					} else {
						var $temp$_n16 = _Utils_Tuple2(tokensTail, model);
						_n16 = $temp$_n16;
						continue emphasisTTM;
					}
				} else {
					if (_Utils_cmp(leftRank, rightRank) < 0) {
						var $temp$_n16 = _Utils_Tuple2(
							tokensTail,
							A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
						_n16 = $temp$_n16;
						continue emphasisTTM;
					} else {
						return pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM(
							A2(
								elm$core$Maybe$withDefault,
								_Utils_Tuple2(tokensTail, model),
								A2(
									elm$core$Maybe$map,
									A3(pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisToMatch, token, tokensTail, model),
									A2(
										pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
										pablohirafuji$elm_markdown$Markdown$InlineParser$isOpenEmphasisToken(token),
										model.tokens))));
					}
				}
			} else {
				var $temp$_n16 = _Utils_Tuple2(
					tokensTail,
					A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_n16 = $temp$_n16;
				continue emphasisTTM;
			}
		}
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisToMatch = F4(
	function (closeToken, tokensTail, model, _n15) {
		var openToken = _n15.a;
		var innerTokens = _n15.b;
		var remainTokens = _n15.c;
		var remainLength = openToken.length - closeToken.length;
		var updt = (!remainLength) ? {closeToken: closeToken, openToken: openToken, remainTokens: remainTokens, tokensTail: tokensTail} : ((remainLength > 0) ? {
			closeToken: closeToken,
			openToken: _Utils_update(
				openToken,
				{index: openToken.index + remainLength, length: closeToken.length}),
			remainTokens: A2(
				elm$core$List$cons,
				_Utils_update(
					openToken,
					{length: remainLength}),
				remainTokens),
			tokensTail: tokensTail
		} : {
			closeToken: _Utils_update(
				closeToken,
				{length: openToken.length}),
			openToken: openToken,
			remainTokens: remainTokens,
			tokensTail: A2(
				elm$core$List$cons,
				_Utils_update(
					closeToken,
					{index: closeToken.index + openToken.length, length: -remainLength}),
				tokensTail)
		});
		var match = A6(
			pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
			model,
			function (s) {
				return s;
			},
			pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisType(updt.openToken.length),
			updt.openToken,
			updt.closeToken,
			elm$core$List$reverse(innerTokens));
		return _Utils_Tuple2(
			updt.tokensTail,
			_Utils_update(
				model,
				{
					matches: A2(elm$core$List$cons, match, model.matches),
					tokens: updt.remainTokens
				}));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM = function (_n12) {
	htmlElementTTM:
	while (true) {
		var tokens = _n12.a;
		var model = _n12.b;
		if (!tokens.b) {
			return pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _n14 = token.meaning;
			if (_n14.$ === 'HtmlToken') {
				var isOpen = _n14.a;
				var htmlModel = _n14.b;
				return (pablohirafuji$elm_markdown$Markdown$InlineParser$isVoidTag(htmlModel) || (!isOpen)) ? pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM(
					function (b) {
						return _Utils_Tuple2(tokensTail, b);
					}(
						A2(
							pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch,
							model,
							A2(
								pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch,
								token,
								pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType(htmlModel))))) : pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM(
					A2(
						elm$core$Maybe$withDefault,
						function (b) {
							return _Utils_Tuple2(tokensTail, b);
						}(
							A2(
								pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch,
								model,
								A2(
									pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch,
									token,
									pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType(htmlModel)))),
						A2(
							elm$core$Maybe$map,
							A3(pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementToMatch, token, model, htmlModel),
							A2(
								pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
								pablohirafuji$elm_markdown$Markdown$InlineParser$isCloseToken(htmlModel),
								tokensTail))));
			} else {
				var $temp$_n12 = _Utils_Tuple2(
					tokensTail,
					A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_n12 = $temp$_n12;
				continue htmlElementTTM;
			}
		}
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementToMatch = F4(
	function (openToken, model, htmlModel, _n11) {
		var closeToken = _n11.a;
		var innerTokens = _n11.b;
		var remainTokens = _n11.c;
		return _Utils_Tuple2(
			remainTokens,
			_Utils_update(
				model,
				{
					matches: A2(
						elm$core$List$cons,
						A6(
							pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
							model,
							function (s) {
								return s;
							},
							pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType(htmlModel),
							openToken,
							closeToken,
							innerTokens),
						model.matches)
				}));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageTypeTTM = function (_n8) {
	linkImageTypeTTM:
	while (true) {
		var tokens = _n8.a;
		var model = _n8.b;
		if (!tokens.b) {
			return pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _n10 = token.meaning;
			if ((_n10.$ === 'CharToken') && (']' === _n10.a.valueOf())) {
				return pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageTypeTTM(
					A2(
						elm$core$Maybe$withDefault,
						_Utils_Tuple2(tokensTail, model),
						A2(
							elm$core$Maybe$andThen,
							A3(pablohirafuji$elm_markdown$Markdown$InlineParser$linkOrImageTypeToMatch, token, tokensTail, model),
							A2(pablohirafuji$elm_markdown$Markdown$InlineParser$findToken, pablohirafuji$elm_markdown$Markdown$InlineParser$isLinkTypeOrImageOpenToken, model.tokens))));
			} else {
				var $temp$_n8 = _Utils_Tuple2(
					tokensTail,
					A2(pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_n8 = $temp$_n8;
				continue linkImageTypeTTM;
			}
		}
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$linkOrImageTypeToMatch = F4(
	function (closeToken, tokensTail, model, _n1) {
		var openToken = _n1.a;
		var innerTokens = _n1.b;
		var remainTokens = _n1.c;
		var tempMatch = function (isLinkType) {
			return A6(
				pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
				model,
				function (s) {
					return s;
				},
				isLinkType ? pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType(
					_Utils_Tuple2('', elm$core$Maybe$Nothing)) : pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType(
					_Utils_Tuple2('', elm$core$Maybe$Nothing)),
				openToken,
				closeToken,
				elm$core$List$reverse(innerTokens));
		};
		var removeOpenToken = _Utils_Tuple2(
			tokensTail,
			_Utils_update(
				model,
				{
					tokens: _Utils_ap(innerTokens, remainTokens)
				}));
		var remainText = A2(elm$core$String$dropLeft, closeToken.index + 1, model.rawText);
		var linkOpenTokenToInactive = function (model_) {
			var process = function (token) {
				var _n7 = token.meaning;
				if (_n7.$ === 'LinkOpenToken') {
					return _Utils_update(
						token,
						{
							meaning: pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken(false)
						});
				} else {
					return token;
				}
			};
			return _Utils_update(
				model_,
				{
					tokens: A2(elm$core$List$map, process, model_.tokens)
				});
		};
		var args = function (isLinkType) {
			return _Utils_Tuple3(
				remainText,
				tempMatch(isLinkType),
				_Utils_update(
					model,
					{tokens: remainTokens}));
		};
		var _n2 = openToken.meaning;
		switch (_n2.$) {
			case 'ImageOpenToken':
				return elm$core$Result$toMaybe(
					A2(
						pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
						function (_n4) {
							return elm$core$Result$Ok(removeOpenToken);
						},
						A2(
							elm$core$Result$map,
							pablohirafuji$elm_markdown$Markdown$InlineParser$removeParsedAheadTokens(tokensTail),
							A2(
								elm$core$Result$andThen,
								pablohirafuji$elm_markdown$Markdown$InlineParser$checkParsedAheadOverlapping,
								A2(
									elm$core$Result$mapError,
									function (_n3) {
										return _Utils_Tuple0;
									},
									A2(
										pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
										pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType,
										pablohirafuji$elm_markdown$Markdown$InlineParser$checkForInlineLinkTypeOrImageType(
											args(false))))))));
			case 'LinkOpenToken':
				if (_n2.a) {
					return elm$core$Result$toMaybe(
						A2(
							pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
							function (_n6) {
								return elm$core$Result$Ok(removeOpenToken);
							},
							A2(
								elm$core$Result$map,
								pablohirafuji$elm_markdown$Markdown$InlineParser$removeParsedAheadTokens(tokensTail),
								A2(
									elm$core$Result$map,
									linkOpenTokenToInactive,
									A2(
										elm$core$Result$andThen,
										pablohirafuji$elm_markdown$Markdown$InlineParser$checkParsedAheadOverlapping,
										A2(
											elm$core$Result$mapError,
											function (_n5) {
												return _Utils_Tuple0;
											},
											A2(
												pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
												pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType,
												pablohirafuji$elm_markdown$Markdown$InlineParser$checkForInlineLinkTypeOrImageType(
													args(true)))))))));
				} else {
					return elm$core$Maybe$Just(removeOpenToken);
				}
			default:
				return elm$core$Maybe$Nothing;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch = F6(
	function (model, processText, type_, openToken, closeToken, innerTokens) {
		var textStart = openToken.index + openToken.length;
		var textEnd = closeToken.index;
		var start = openToken.index;
		var end = closeToken.index + closeToken.length;
		var match = {
			end: end,
			matches: _List_Nil,
			start: start,
			text: processText(
				A3(elm$core$String$slice, textStart, textEnd, model.rawText)),
			textEnd: textEnd,
			textStart: textStart,
			type_: type_
		};
		var matches = A2(
			elm$core$List$map,
			function (_n0) {
				var matchModel = _n0.a;
				return A2(pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch, match, matchModel);
			},
			pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches()(
				_Utils_update(
					model,
					{matches: _List_Nil, tokens: innerTokens})).matches);
		return pablohirafuji$elm_markdown$Markdown$InlineParser$Match(
			_Utils_update(
				match,
				{matches: matches}));
	});
function pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches() {
	return A2(
		elm$core$Basics$composeR,
		pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM(pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM),
		A2(
			elm$core$Basics$composeR,
			pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM(pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM),
			A2(
				elm$core$Basics$composeR,
				pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM(pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageTypeTTM),
				A2(
					elm$core$Basics$composeR,
					pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM(pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM),
					pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM(pablohirafuji$elm_markdown$Markdown$InlineParser$lineBreakTTM)))));
}
try {
	var pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches = pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches();
	pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches = function () {
		return pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches;
	};
} catch ($) {
throw 'Some top-level definitions from `Markdown.InlineParser` are causing infinite recursion:\n\n  ┌─────┐\n  │    angleBracketsToMatch\n  │     ↓\n  │    tokensToMatches\n  │     ↓\n  │    codeAutolinkTypeHtmlTagTTM\n  │     ↓\n  │    codeToMatch\n  │     ↓\n  │    emphasisTTM\n  │     ↓\n  │    emphasisToMatch\n  │     ↓\n  │    htmlElementTTM\n  │     ↓\n  │    htmlElementToMatch\n  │     ↓\n  │    linkImageTypeTTM\n  │     ↓\n  │    linkOrImageTypeToMatch\n  │     ↓\n  │    tokenPairToMatch\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var pablohirafuji$elm_markdown$Markdown$InlineParser$parse = F3(
	function (options, refs, rawText) {
		return pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(
			pablohirafuji$elm_markdown$Markdown$InlineParser$parseText(
				pablohirafuji$elm_markdown$Markdown$InlineParser$organizeParserMatches(
					pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches(
						pablohirafuji$elm_markdown$Markdown$InlineParser$tokenize(
							A3(
								pablohirafuji$elm_markdown$Markdown$InlineParser$initParser,
								options,
								refs,
								elm$core$String$trim(rawText)))))).matches);
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseInline = F4(
	function (maybeOptions, textAsParagraph, refs, block) {
		var options = A2(elm$core$Maybe$withDefault, pablohirafuji$elm_markdown$Markdown$Config$defaultOptions, maybeOptions);
		switch (block.$) {
			case 'Heading':
				var rawText = block.a;
				var lvl = block.b;
				return A3(
					pablohirafuji$elm_markdown$Markdown$Block$Heading,
					rawText,
					lvl,
					A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parse, options, refs, rawText));
			case 'Paragraph':
				var rawText = block.a;
				var inlines = A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parse, options, refs, rawText);
				if ((inlines.b && (inlines.a.$ === 'HtmlInline')) && (!inlines.b.b)) {
					var _n3 = inlines.a;
					return pablohirafuji$elm_markdown$Markdown$Block$PlainInlines(inlines);
				} else {
					return textAsParagraph ? A2(pablohirafuji$elm_markdown$Markdown$Block$Paragraph, rawText, inlines) : pablohirafuji$elm_markdown$Markdown$Block$PlainInlines(inlines);
				}
			case 'BlockQuote':
				var blocks = block.a;
				return pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(
					A3(
						pablohirafuji$elm_markdown$Markdown$Block$parseInlines,
						maybeOptions,
						true,
						_Utils_Tuple2(refs, blocks)));
			case 'List':
				var model = block.a;
				var items = block.b;
				return A2(
					pablohirafuji$elm_markdown$Markdown$Block$List,
					model,
					function (a) {
						return A2(elm$core$List$map, a, items);
					}(
						A2(
							elm$core$Basics$composeL,
							A2(pablohirafuji$elm_markdown$Markdown$Block$parseInlines, maybeOptions, model.isLoose),
							function (b) {
								return _Utils_Tuple2(refs, b);
							})));
			case 'Custom':
				var customBlock = block.a;
				var blocks = block.b;
				return A2(
					pablohirafuji$elm_markdown$Markdown$Block$Custom,
					customBlock,
					A3(
						pablohirafuji$elm_markdown$Markdown$Block$parseInlines,
						maybeOptions,
						true,
						_Utils_Tuple2(refs, blocks)));
			default:
				return block;
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseInlines = F3(
	function (maybeOptions, textAsParagraph, _n0) {
		var refs = _n0.a;
		var blocks = _n0.b;
		return A2(
			elm$core$List$map,
			A3(pablohirafuji$elm_markdown$Markdown$Block$parseInline, maybeOptions, textAsParagraph, refs),
			blocks);
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var pablohirafuji$elm_markdown$Markdown$Block$dropRefString = F2(
	function (rawText, inlineMatch) {
		var strippedText = A2(elm$core$String$dropLeft, inlineMatch.matchLength, rawText);
		return A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, strippedText) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(strippedText);
	});
var pablohirafuji$elm_markdown$Markdown$Block$insertLinkMatch = F2(
	function (refs, linkMatch) {
		return A2(elm$core$Dict$member, linkMatch.inside, refs) ? refs : A3(
			elm$core$Dict$insert,
			linkMatch.inside,
			_Utils_Tuple2(linkMatch.url, linkMatch.maybeTitle),
			refs);
	});
var pablohirafuji$elm_markdown$Markdown$Block$extractUrlTitleRegex = function (regexMatch) {
	var _n0 = regexMatch.submatches;
	if ((((((_n0.b && (_n0.a.$ === 'Just')) && _n0.b.b) && _n0.b.b.b) && _n0.b.b.b.b) && _n0.b.b.b.b.b) && _n0.b.b.b.b.b.b) {
		var rawText = _n0.a.a;
		var _n1 = _n0.b;
		var maybeRawUrlAngleBrackets = _n1.a;
		var _n2 = _n1.b;
		var maybeRawUrlWithoutBrackets = _n2.a;
		var _n3 = _n2.b;
		var maybeTitleSingleQuotes = _n3.a;
		var _n4 = _n3.b;
		var maybeTitleDoubleQuotes = _n4.a;
		var _n5 = _n4.b;
		var maybeTitleParenthesis = _n5.a;
		var toReturn = function (rawUrl) {
			return {
				inside: rawText,
				matchLength: elm$core$String$length(regexMatch.match),
				maybeTitle: pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
					_List_fromArray(
						[maybeTitleSingleQuotes, maybeTitleDoubleQuotes, maybeTitleParenthesis])),
				url: rawUrl
			};
		};
		var maybeRawUrl = pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
			_List_fromArray(
				[maybeRawUrlAngleBrackets, maybeRawUrlWithoutBrackets]));
		return A2(elm$core$Maybe$map, toReturn, maybeRawUrl);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_markdown$Markdown$Block$hrefRegex = '\\s*(?:<([^<>\\s]*)>|([^\\s]*))';
var pablohirafuji$elm_markdown$Markdown$Block$refRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^\\s*\\[(' + (pablohirafuji$elm_markdown$Markdown$Helpers$insideSquareBracketRegex + (')\\]:' + (pablohirafuji$elm_markdown$Markdown$Block$hrefRegex + (pablohirafuji$elm_markdown$Markdown$Helpers$titleRegex + '\\s*(?![^\\n])'))))));
var pablohirafuji$elm_markdown$Markdown$Block$maybeLinkMatch = function (rawText) {
	return A2(
		elm$core$Maybe$andThen,
		function (linkMatch) {
			return ((linkMatch.url === '') || (linkMatch.inside === '')) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(linkMatch);
		},
		A2(
			elm$core$Maybe$map,
			function (linkMatch) {
				return _Utils_update(
					linkMatch,
					{
						inside: pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel(linkMatch.inside)
					});
			},
			A2(
				elm$core$Maybe$andThen,
				pablohirafuji$elm_markdown$Markdown$Block$extractUrlTitleRegex,
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$refRegex, rawText)))));
};
var pablohirafuji$elm_markdown$Markdown$Block$parseReference = F2(
	function (refs, rawText) {
		parseReference:
		while (true) {
			var _n0 = pablohirafuji$elm_markdown$Markdown$Block$maybeLinkMatch(rawText);
			if (_n0.$ === 'Just') {
				var linkMatch = _n0.a;
				var updtRefs = A2(pablohirafuji$elm_markdown$Markdown$Block$insertLinkMatch, refs, linkMatch);
				var maybeStrippedText = A2(pablohirafuji$elm_markdown$Markdown$Block$dropRefString, rawText, linkMatch);
				if (maybeStrippedText.$ === 'Just') {
					var strippedText = maybeStrippedText.a;
					var $temp$refs = updtRefs,
						$temp$rawText = strippedText;
					refs = $temp$refs;
					rawText = $temp$rawText;
					continue parseReference;
				} else {
					return _Utils_Tuple2(updtRefs, elm$core$Maybe$Nothing);
				}
			} else {
				return _Utils_Tuple2(
					refs,
					elm$core$Maybe$Just(rawText));
			}
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseReferences = function (refs) {
	return A2(
		elm$core$List$foldl,
		pablohirafuji$elm_markdown$Markdown$Block$parseReferencesHelp,
		_Utils_Tuple2(refs, _List_Nil));
};
var pablohirafuji$elm_markdown$Markdown$Block$parseReferencesHelp = F2(
	function (block, _n0) {
		var refs = _n0.a;
		var parsedAST = _n0.b;
		switch (block.$) {
			case 'Paragraph':
				var rawText = block.a;
				var _n2 = A2(pablohirafuji$elm_markdown$Markdown$Block$parseReference, elm$core$Dict$empty, rawText);
				var paragraphRefs = _n2.a;
				var maybeUpdtText = _n2.b;
				var updtRefs = A2(elm$core$Dict$union, paragraphRefs, refs);
				if (maybeUpdtText.$ === 'Just') {
					var updtText = maybeUpdtText.a;
					return _Utils_Tuple2(
						updtRefs,
						A2(
							elm$core$List$cons,
							A2(pablohirafuji$elm_markdown$Markdown$Block$Paragraph, updtText, _List_Nil),
							parsedAST));
				} else {
					return _Utils_Tuple2(updtRefs, parsedAST);
				}
			case 'List':
				var model = block.a;
				var items = block.b;
				var _n4 = A3(
					elm$core$List$foldl,
					F2(
						function (item, _n5) {
							var refs__ = _n5.a;
							var parsedItems = _n5.b;
							return A2(
								elm$core$Tuple$mapSecond,
								function (a) {
									return A2(elm$core$List$cons, a, parsedItems);
								},
								A2(pablohirafuji$elm_markdown$Markdown$Block$parseReferences, refs__, item));
						}),
					_Utils_Tuple2(refs, _List_Nil),
					items);
				var updtRefs = _n4.a;
				var updtItems = _n4.b;
				return _Utils_Tuple2(
					updtRefs,
					A2(
						elm$core$List$cons,
						A2(pablohirafuji$elm_markdown$Markdown$Block$List, model, updtItems),
						parsedAST));
			case 'BlockQuote':
				var blocks = block.a;
				return A2(
					elm$core$Tuple$mapSecond,
					function (a) {
						return A2(elm$core$List$cons, a, parsedAST);
					},
					A2(
						elm$core$Tuple$mapSecond,
						pablohirafuji$elm_markdown$Markdown$Block$BlockQuote,
						A2(pablohirafuji$elm_markdown$Markdown$Block$parseReferences, refs, blocks)));
			case 'Custom':
				var customBlock = block.a;
				var blocks = block.b;
				return A2(
					elm$core$Tuple$mapSecond,
					function (a) {
						return A2(elm$core$List$cons, a, parsedAST);
					},
					A2(
						elm$core$Tuple$mapSecond,
						pablohirafuji$elm_markdown$Markdown$Block$Custom(customBlock),
						A2(pablohirafuji$elm_markdown$Markdown$Block$parseReferences, refs, blocks)));
			default:
				return _Utils_Tuple2(
					refs,
					A2(elm$core$List$cons, block, parsedAST));
		}
	});
var pablohirafuji$elm_markdown$Markdown$Block$parse = function (maybeOptions) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$String$lines,
		A2(
			elm$core$Basics$composeR,
			function (a) {
				return A2(pablohirafuji$elm_markdown$Markdown$Block$incorporateLines, a, _List_Nil);
			},
			A2(
				elm$core$Basics$composeR,
				pablohirafuji$elm_markdown$Markdown$Block$parseReferences(elm$core$Dict$empty),
				A2(pablohirafuji$elm_markdown$Markdown$Block$parseInlines, maybeOptions, true))));
};
var author$project$MarkdownTools$view = function (markdownString) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		elm$core$List$concat(
			A2(
				elm$core$List$map,
				author$project$MarkdownTools$customHtmlBlock,
				A2(
					pablohirafuji$elm_markdown$Markdown$Block$parse,
					elm$core$Maybe$Nothing,
					A2(
						elm$core$String$join,
						'\n',
						A2(author$project$Utility$softBreakAlt, 70, markdownString))))));
};
var author$project$Document$viewMarkdown = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		mdgriffith$stylish_elephants$Element$html(
			author$project$MarkdownTools$view(document.content)));
};
var author$project$Document$normalize = function (str) {
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$filter,
			function (x) {
				return x !== '';
			},
			elm$core$String$lines(str)));
};
var author$project$Document$prependMacros = F2(
	function (macros_, sourceText) {
		var macros__ = author$project$Document$normalize(macros_);
		return '$$\n' + (macros__ + ('\n$$\n\n' + sourceText));
	});
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Keyed$node = elm$virtual_dom$VirtualDom$keyedNode;
var jxxcarlson$meenylatex$MeenyLatex$Driver$getRenderedText = F2(
	function (macroDefinitions, editRecord) {
		var paragraphs = editRecord.renderedParagraphs;
		var ids = editRecord.idList;
		return A3(
			elm$core$List$map2,
			F2(
				function (para, id) {
					return A3(
						elm$html$Html$Keyed$node,
						'p',
						_List_fromArray(
							[
								elm$html$Html$Attributes$id(id)
							]),
						_List_fromArray(
							[
								_Utils_Tuple2(id, para)
							]));
				}),
			paragraphs,
			ids);
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord = F6(
	function (paragraphs, renderedParagraphs, latexState, idList, newIdsStart, newIdsEnd) {
		return {idList: idList, latexState: latexState, newIdsEnd: newIdsEnd, newIdsStart: newIdsStart, paragraphs: paragraphs, renderedParagraphs: renderedParagraphs};
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$initialCounters = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('s1', 0),
			_Utils_Tuple2('s2', 0),
			_Utils_Tuple2('s3', 0),
			_Utils_Tuple2('tno', 0),
			_Utils_Tuple2('eqno', 0)
		]));
var jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState = {counters: jxxcarlson$meenylatex$MeenyLatex$LatexState$initialCounters, crossReferences: elm$core$Dict$empty, dictionary: elm$core$Dict$empty, tableOfContents: _List_Nil};
var jxxcarlson$meenylatex$MeenyLatex$Differ$emptyEditRecordHtmlMsg = A6(jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord, _List_Nil, _List_Nil, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, _List_Nil, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing);
var jxxcarlson$meenylatex$MeenyLatex$Differ$isEmpty = function (editRecord) {
	return _Utils_eq(editRecord.paragraphs, _List_Nil) && _Utils_eq(editRecord.renderedParagraphs, _List_Nil);
};
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$LatexInfo = F4(
	function (typ, name, options, value) {
		return {name: name, options: options, typ: typ, value: value};
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$info = function (latexExpression) {
	switch (latexExpression.$) {
		case 'Macro':
			var name = latexExpression.a;
			var optArgs = latexExpression.b;
			var args = latexExpression.c;
			return {name: name, options: optArgs, typ: 'macro', value: args};
		case 'SMacro':
			var name = latexExpression.a;
			var optArgs = latexExpression.b;
			var args = latexExpression.c;
			var body = latexExpression.d;
			return {name: name, options: optArgs, typ: 'smacro', value: args};
		case 'Environment':
			var name = latexExpression.a;
			var args = latexExpression.b;
			var body = latexExpression.c;
			return {
				name: name,
				options: args,
				typ: 'env',
				value: _List_fromArray(
					[body])
			};
		default:
			return {name: 'null', options: _List_Nil, typ: 'null', value: _List_Nil};
	}
};
var jxxcarlson$meenylatex$MeenyLatex$LatexState$setDictionaryItem = F3(
	function (key, value, latexState) {
		var dictionary = latexState.dictionary;
		var newDictionary = A3(elm$core$Dict$insert, key, value, dictionary);
		return _Utils_update(
			latexState,
			{dictionary: newDictionary});
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList = function (a) {
	return {$: 'LatexList', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$headLatexExpression = function (list) {
	var he = function () {
		var _n0 = elm$core$List$head(list);
		if (_n0.$ === 'Just') {
			var expr = _n0.a;
			return expr;
		} else {
			return jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList(_List_Nil);
		}
	}();
	return he;
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$valueOfLXString = function (expr) {
	if (expr.$ === 'LXString') {
		var str = expr.a;
		return str;
	} else {
		return 'Error getting value of LatexString';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$LXString = function (a) {
	return {$: 'LXString', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$valueOfLatexList = function (latexList) {
	if (latexList.$ === 'LatexList') {
		var value = latexList.a;
		return value;
	} else {
		return _List_fromArray(
			[
				jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('Error getting value of LatexList')
			]);
	}
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString = function (expr) {
	return jxxcarlson$meenylatex$MeenyLatex$ParserTools$valueOfLXString(
		jxxcarlson$meenylatex$MeenyLatex$ParserTools$headLatexExpression(
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$valueOfLatexList(
				jxxcarlson$meenylatex$MeenyLatex$ParserTools$headLatexExpression(expr))));
};
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setBibItemXRef = F2(
	function (latexInfo, latexState) {
		var label = jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(latexInfo.value);
		var value = _Utils_eq(latexInfo.options, _List_Nil) ? label : jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(latexInfo.options);
		return A3(jxxcarlson$meenylatex$MeenyLatex$LatexState$setDictionaryItem, 'bibitem:' + label, value, latexState);
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setDictionaryItemForMacro = F2(
	function (latexInfo, latexState) {
		var value = jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(latexInfo.value);
		return A3(jxxcarlson$meenylatex$MeenyLatex$LatexState$setDictionaryItem, latexInfo.name, value, latexState);
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter = F2(
	function (name, latexState) {
		var _n0 = A2(elm$core$Dict$get, name, latexState.counters);
		if (_n0.$ === 'Just') {
			var k = _n0.a;
			return k;
		} else {
			return 0;
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$incrementCounter = F2(
	function (name, latexState) {
		var maybeInc = elm$core$Maybe$map(
			function (x) {
				return x + 1;
			});
		var newCounters = A3(elm$core$Dict$update, name, maybeInc, latexState.counters);
		return _Utils_update(
			latexState,
			{counters: newCounters});
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$setCrossReference = F3(
	function (label, value, latexState) {
		var crossReferences = latexState.crossReferences;
		var newCrossReferences = A3(elm$core$Dict$insert, label, value, crossReferences);
		return _Utils_update(
			latexState,
			{crossReferences: newCrossReferences});
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$Macro = F3(
	function (a, b, c) {
		return {$: 'Macro', a: a, b: b, c: c};
	});
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$lazy = function (thunk) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n0 = thunk(_Utils_Tuple0);
			var parse = _n0.a;
			return parse(s);
		});
};
var elm$parser$Parser$lazy = elm$parser$Parser$Advanced$lazy;
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Problem = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$Problem, s.row, s.col, x, s.context));
	});
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$InlineMath = function (a) {
	return {$: 'InlineMath', a: a};
};
var elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm$core$String$slice, 0, -n, string);
	});
var elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n0 = A5(_Parser_findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n0.a;
			var newRow = _n0.b;
			var newCol = _n0.c;
			var adjustedOffset = (newOffset < 0) ? elm$core$String$length(s.src) : newOffset;
			return A3(
				elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, adjustedOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: adjustedOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$chompUntilEndOr = elm$parser$Parser$Advanced$chompUntilEndOr;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$parseTo = function (marker) {
	return A2(
		elm$parser$Parser$map,
		elm$core$String$dropRight(
			elm$core$String$length(marker)),
		elm$parser$Parser$getChompedString(
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(elm$core$Basics$identity),
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$chompUntilEndOr(marker),
					elm$parser$Parser$symbol(marker)))));
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath = function (wsParser) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(jxxcarlson$meenylatex$MeenyLatex$Parser$InlineMath),
			elm$parser$Parser$symbol('$')),
		A2(
			elm$parser$Parser$ignorer,
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$parseTo('$'),
			wsParser));
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$inMacroArg = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr('\\')) || (_Utils_eq(
		c,
		_Utils_chr('$')) || (_Utils_eq(
		c,
		_Utils_chr('}')) || (_Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\n'))))));
};
var elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$parser$Parser$Advanced$getOffset = elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, s.offset, s);
	});
var elm$parser$Parser$getOffset = elm$parser$Parser$Advanced$getOffset;
var elm$parser$Parser$Advanced$getSource = elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, s.src, s);
	});
var elm$parser$Parser$getSource = elm$parser$Parser$Advanced$getSource;
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws = elm$parser$Parser$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || _Utils_eq(
			c,
			_Utils_chr('\n'));
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$word = function (inWord) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(elm$core$String$slice),
					jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$getOffset,
							elm$parser$Parser$chompIf(inWord)),
						elm$parser$Parser$chompWhile(inWord)),
					jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws)),
			elm$parser$Parser$getOffset),
		elm$parser$Parser$getSource);
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$macroArgWord = jxxcarlson$meenylatex$MeenyLatex$Parser$word(jxxcarlson$meenylatex$MeenyLatex$Parser$inMacroArg);
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0.a;
			var _n1 = parse(s0);
			if (_n1.$ === 'Good') {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemListHelper = F2(
	function (itemParser, revItems) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						function (item) {
							return elm$parser$Parser$Loop(
								A2(elm$core$List$cons, item, revItems));
						}),
					itemParser),
					A2(
					elm$parser$Parser$map,
					function (_n0) {
						return elm$parser$Parser$Done(
							elm$core$List$reverse(revItems));
					},
					elm$parser$Parser$succeed(_Utils_Tuple0))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList_ = F2(
	function (initialList, itemParser) {
		return A2(
			elm$parser$Parser$loop,
			initialList,
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemListHelper(itemParser));
	});
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList = function (itemParser) {
	return A2(
		elm$parser$Parser$andThen,
		function (x) {
			return A2(
				jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList_,
				_List_fromArray(
					[x]),
				itemParser);
		},
		itemParser);
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$macroArgWords = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LXString,
	A2(
		elm$parser$Parser$map,
		elm$core$String$join(' '),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(jxxcarlson$meenylatex$MeenyLatex$Parser$macroArgWord)));
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var elm$parser$Parser$ExpectingVariable = {$: 'ExpectingVariable'};
var elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {col: col, context: context, indent: indent, offset: offset, row: row, src: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$variable = function (i) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var firstOffset = A3(elm$parser$Parser$Advanced$isSubChar, i.start, s.offset, s.src);
			if (_Utils_eq(firstOffset, -1)) {
				return A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, i.expecting));
			} else {
				var s1 = _Utils_eq(firstOffset, -2) ? A7(elm$parser$Parser$Advanced$varHelp, i.inner, s.offset + 1, s.row + 1, 1, s.src, s.indent, s.context) : A7(elm$parser$Parser$Advanced$varHelp, i.inner, firstOffset, s.row, s.col + 1, s.src, s.indent, s.context);
				var name = A3(elm$core$String$slice, s.offset, s1.offset, s.src);
				return A2(elm$core$Set$member, name, i.reserved) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, i.expecting)) : A3(elm$parser$Parser$Advanced$Good, true, name, s1);
			}
		});
};
var elm$parser$Parser$variable = function (i) {
	return elm$parser$Parser$Advanced$variable(
		{expecting: elm$parser$Parser$ExpectingVariable, inner: i.inner, reserved: i.reserved, start: i.start});
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$macroName = A2(
	elm$parser$Parser$map,
	elm$core$String$dropLeft(1),
	elm$parser$Parser$variable(
		{
			inner: function (c) {
				return elm$core$Char$isAlphaNum(c);
			},
			reserved: elm$core$Set$fromList(
				_List_fromArray(
					['\\begin', '\\end', '\\item', '\\bibitem'])),
			start: function (c) {
				return _Utils_eq(
					c,
					_Utils_chr('\\'));
			}
		}));
var jxxcarlson$meenylatex$MeenyLatex$Parser$inOptionArgWord = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr('\\')) || (_Utils_eq(
		c,
		_Utils_chr('$')) || (_Utils_eq(
		c,
		_Utils_chr(']')) || (_Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\n'))))));
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$optionArgWord = jxxcarlson$meenylatex$MeenyLatex$Parser$word(jxxcarlson$meenylatex$MeenyLatex$Parser$inOptionArgWord);
var jxxcarlson$meenylatex$MeenyLatex$Parser$optionArgWords = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LXString,
	A2(
		elm$parser$Parser$map,
		elm$core$String$join(' '),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(jxxcarlson$meenylatex$MeenyLatex$Parser$optionArgWord)));
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList = function (itemParser) {
	return A2(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList_, _List_Nil, itemParser);
};
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces = elm$parser$Parser$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' '));
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$optionalArg = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			elm$parser$Parser$symbol('[')),
		A2(
			elm$parser$Parser$ignorer,
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Parser$optionArgWords,
							jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces)
						]))),
			elm$parser$Parser$symbol(']'))));
var jxxcarlson$meenylatex$MeenyLatex$Parser$macro = function (wsParser) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(jxxcarlson$meenylatex$MeenyLatex$Parser$Macro),
				jxxcarlson$meenylatex$MeenyLatex$Parser$macroName),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(jxxcarlson$meenylatex$MeenyLatex$Parser$optionalArg)),
		A2(
			elm$parser$Parser$ignorer,
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(
				jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$arg()),
			wsParser));
};
function jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$arg() {
	return A2(
		elm$parser$Parser$map,
		jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(elm$core$Basics$identity),
				elm$parser$Parser$symbol('{')),
			A2(
				elm$parser$Parser$ignorer,
				jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								jxxcarlson$meenylatex$MeenyLatex$Parser$macroArgWords,
								jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
								elm$parser$Parser$lazy(
								function (_n0) {
									return jxxcarlson$meenylatex$MeenyLatex$Parser$macro(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces);
								})
							]))),
				elm$parser$Parser$symbol('}'))));
}
try {
	var jxxcarlson$meenylatex$MeenyLatex$Parser$arg = jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$arg();
	jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$arg = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Parser$arg;
	};
} catch ($) {
throw 'Some top-level definitions from `MeenyLatex.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    arg\n  │     ↓\n  │    macro\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$latexList2List = function (latexExpression) {
	if (latexExpression.$ === 'LatexList') {
		var list = latexExpression.a;
		return list;
	} else {
		return _List_Nil;
	}
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$getMacroArgs = F2(
	function (macroName, latexExpression) {
		if (latexExpression.$ === 'Macro') {
			var name = latexExpression.a;
			var optArgs = latexExpression.b;
			var args = latexExpression.c;
			return _Utils_eq(name, macroName) ? A2(elm$core$List$map, jxxcarlson$meenylatex$MeenyLatex$ParserTools$latexList2List, args) : _List_Nil;
		} else {
			return _List_Nil;
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$list2LeadingString = function (list) {
	var head_ = elm$core$List$head(list);
	var value = function () {
		if (head_.$ === 'Just') {
			var value_ = head_.a;
			return value_;
		} else {
			return jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('');
		}
	}();
	if (value.$ === 'LXString') {
		var str = value.a;
		return str;
	} else {
		return '';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$getSimpleMacroArgs = F2(
	function (macroName, latexExpression) {
		return A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$list2LeadingString,
			A2(jxxcarlson$meenylatex$MeenyLatex$ParserTools$getMacroArgs, macroName, latexExpression));
	});
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$getFirstMacroArg = F2(
	function (macroName, latexExpression) {
		var arg = elm$core$List$head(
			A2(jxxcarlson$meenylatex$MeenyLatex$ParserTools$getSimpleMacroArgs, macroName, latexExpression));
		if (arg.$ === 'Just') {
			var value = arg.a;
			return value;
		} else {
			return '';
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$getLabel = function (str) {
	var maybeMacro = A2(
		elm$parser$Parser$run,
		jxxcarlson$meenylatex$MeenyLatex$Parser$macro(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
		elm$core$String$trim(str));
	if (maybeMacro.$ === 'Ok') {
		var macro = maybeMacro.a;
		return A2(jxxcarlson$meenylatex$MeenyLatex$ParserTools$getFirstMacroArg, 'label', macro);
	} else {
		return '';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setEquationNumber = F2(
	function (info, latexState) {
		var latexState1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$incrementCounter, 'eqno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState1);
		var eqno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'eqno', latexState1);
		var data = A2(
			elm$core$Maybe$withDefault,
			A3(jxxcarlson$meenylatex$MeenyLatex$Parser$Macro, 'NULL', _List_Nil, _List_Nil),
			elm$core$List$head(info.value));
		var label = function () {
			if (data.$ === 'LXString') {
				var str = data.a;
				return jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$getLabel(str);
			} else {
				return '';
			}
		}();
		var latexState2 = (label !== '') ? A3(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$setCrossReference,
			label,
			elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(eqno)),
			latexState1) : latexState1;
		return latexState2;
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$updateCounter = F3(
	function (name, value, latexState) {
		var maybeSet = elm$core$Maybe$map(
			function (x) {
				return value;
			});
		var newCounters = A3(elm$core$Dict$update, name, maybeSet, latexState.counters);
		return _Utils_update(
			latexState,
			{counters: newCounters});
	});
var jxxcarlson$meenylatex$MeenyLatex$Utility$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? elm$core$Maybe$Nothing : elm$core$List$head(
			A2(elm$core$List$drop, idx, xs));
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$getAt = F2(
	function (k, list_) {
		return A2(
			elm$core$Maybe$withDefault,
			'xxx',
			A2(jxxcarlson$meenylatex$MeenyLatex$Utility$getAt, k, list_));
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setSectionCounters = F2(
	function (info, latexState) {
		var argList = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$list2LeadingString,
			A2(elm$core$List$map, jxxcarlson$meenylatex$MeenyLatex$ParserTools$latexList2List, info.value));
		var arg2 = A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$getAt, 1, argList);
		var arg1 = A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$getAt, 0, argList);
		var initialSectionNumber = (arg1 === 'section') ? A2(
			elm$core$Maybe$withDefault,
			0,
			elm$core$String$toInt(arg2)) : (-1);
		return (_Utils_cmp(initialSectionNumber, -1) > 0) ? A3(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$updateCounter,
			's3',
			0,
			A3(
				jxxcarlson$meenylatex$MeenyLatex$LatexState$updateCounter,
				's2',
				0,
				A3(jxxcarlson$meenylatex$MeenyLatex$LatexState$updateCounter, 's1', initialSectionNumber - 1, latexState))) : latexState;
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setTheoremNumber = F2(
	function (info, latexState) {
		var latexState1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$incrementCounter, 'tno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState1);
		var tno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'tno', latexState1);
		var label = A2(
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$getFirstMacroArg,
			'label',
			A2(
				elm$core$Maybe$withDefault,
				A3(jxxcarlson$meenylatex$MeenyLatex$Parser$Macro, 'NULL', _List_Nil, _List_Nil),
				elm$core$List$head(info.value)));
		var latexState2 = (label !== '') ? A3(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$setCrossReference,
			label,
			elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(tno)),
			latexState1) : latexState1;
		return latexState2;
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$TocEntry = F3(
	function (name, label, level) {
		return {label: label, level: level, name: name};
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$addSection = F4(
	function (sectionName, label, level, latexState) {
		var newEntry = A3(jxxcarlson$meenylatex$MeenyLatex$LatexState$TocEntry, sectionName, label, level);
		var toc = _Utils_ap(
			latexState.tableOfContents,
			_List_fromArray(
				[newEntry]));
		return _Utils_update(
			latexState,
			{tableOfContents: toc});
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$updateSectionNumber = F2(
	function (info, latexState) {
		var label = elm$core$String$fromInt(
			function (x) {
				return x + 1;
			}(
				A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState)));
		return A4(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$addSection,
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(info.value),
			label,
			1,
			A3(
				jxxcarlson$meenylatex$MeenyLatex$LatexState$updateCounter,
				's3',
				0,
				A3(
					jxxcarlson$meenylatex$MeenyLatex$LatexState$updateCounter,
					's2',
					0,
					A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$incrementCounter, 's1', latexState))));
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$updateSubsectionNumber = F2(
	function (info, latexState) {
		var s2 = elm$core$String$fromInt(
			function (x) {
				return x + 1;
			}(
				A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's2', latexState)));
		var s1 = elm$core$String$fromInt(
			A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState));
		var label = s1 + ('.' + s2);
		return A4(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$addSection,
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(info.value),
			label,
			2,
			A3(
				jxxcarlson$meenylatex$MeenyLatex$LatexState$updateCounter,
				's3',
				0,
				A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$incrementCounter, 's2', latexState)));
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$updateSubsubsectionNumber = F2(
	function (info, latexState) {
		var s3 = elm$core$String$fromInt(
			function (x) {
				return x + 1;
			}(
				A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's3', latexState)));
		var s2 = elm$core$String$fromInt(
			A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's2', latexState));
		var s1 = elm$core$String$fromInt(
			A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState));
		var label = s1 + ('.' + (s2 + ('.' + s3)));
		return A4(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$addSection,
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(info.value),
			label,
			2,
			A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$incrementCounter, 's3', latexState));
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$latexStateReducerDict = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'setcounter'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setSectionCounters, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'section'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$updateSectionNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'subsection'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$updateSubsectionNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'subsubsection'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$updateSubsubsectionNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'title'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setDictionaryItemForMacro, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'author'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setDictionaryItemForMacro, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'date'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setDictionaryItemForMacro, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'email'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setDictionaryItemForMacro, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('macro', 'revision'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setDictionaryItemForMacro, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('env', 'theorem'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setTheoremNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('env', 'proposition'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setTheoremNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('env', 'lemma'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setTheoremNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('env', 'definition'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setTheoremNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('env', 'corollary'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setTheoremNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('env', 'equation'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setEquationNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('env', 'align'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setEquationNumber, x, y);
				})),
			_Utils_Tuple2(
			_Utils_Tuple2('smacro', 'bibitem'),
			F2(
				function (x, y) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setBibItemXRef, x, y);
				}))
		]));
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$latexStateReducerDispatcher = function (_n0) {
	var typ_ = _n0.a;
	var name = _n0.b;
	var _n1 = A2(
		elm$core$Dict$get,
		_Utils_Tuple2(typ_, name),
		jxxcarlson$meenylatex$MeenyLatex$Accumulator$latexStateReducerDict);
	if (_n1.$ === 'Just') {
		var f = _n1.a;
		return f;
	} else {
		return F2(
			function (latexInfo, latexState) {
				return latexState;
			});
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$latexStateReducer = F2(
	function (parsedParagraph, latexState) {
		var headElement = A2(
			elm$core$Maybe$withDefault,
			A4(jxxcarlson$meenylatex$MeenyLatex$Accumulator$LatexInfo, 'null', 'null', _List_Nil, _List_Nil),
			A2(
				elm$core$Maybe$map,
				jxxcarlson$meenylatex$MeenyLatex$Accumulator$info,
				elm$core$List$head(parsedParagraph)));
		var he = {
			name: 'setcounter',
			typ: 'macro',
			value: _List_fromArray(
				[
					jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList(
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('section')
						])),
					jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList(
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('7')
						]))
				])
		};
		return A3(
			jxxcarlson$meenylatex$MeenyLatex$Accumulator$latexStateReducerDispatcher,
			_Utils_Tuple2(headElement.typ, headElement.name),
			headElement,
			latexState);
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$parserReducerTransformer = F4(
	function (parse, latexStateReducer_, input, acc) {
		var parsedInput = parse(input);
		var _n0 = acc;
		var outputList = _n0.a;
		var state = _n0.b;
		var newState = A2(latexStateReducer_, parsedInput, state);
		return _Utils_Tuple2(
			_Utils_ap(
				outputList,
				_List_fromArray(
					[parsedInput])),
			newState);
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$LXError = function (a) {
	return {$: 'LXError', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$Environment = F3(
	function (a, b, c) {
		return {$: 'Environment', a: a, b: b, c: c};
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$DisplayMath = function (a) {
	return {$: 'DisplayMath', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$displayMathBrackets = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(jxxcarlson$meenylatex$MeenyLatex$Parser$DisplayMath),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
		elm$parser$Parser$symbol('\\[')),
	jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$parseTo('\\]'));
var jxxcarlson$meenylatex$MeenyLatex$Parser$displayMathDollar = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(jxxcarlson$meenylatex$MeenyLatex$Parser$DisplayMath),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
		elm$parser$Parser$symbol('$$')),
	A2(
		elm$parser$Parser$ignorer,
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$parseTo('$$'),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws));
var jxxcarlson$meenylatex$MeenyLatex$Parser$envName = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
		elm$parser$Parser$symbol('\\begin{')),
	jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$parseTo('}'));
var jxxcarlson$meenylatex$MeenyLatex$Parser$Item = F2(
	function (a, b) {
		return {$: 'Item', a: a, b: b};
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$notSpaceOrSpecialCharacters = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr(' ')) || (_Utils_eq(
		c,
		_Utils_chr('\n')) || (_Utils_eq(
		c,
		_Utils_chr('\\')) || _Utils_eq(
		c,
		_Utils_chr('$')))));
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$words_ = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LXString,
	A2(
		elm$parser$Parser$map,
		elm$core$String$join(' '),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(
			jxxcarlson$meenylatex$MeenyLatex$Parser$word(jxxcarlson$meenylatex$MeenyLatex$Parser$notSpaceOrSpecialCharacters))));
var jxxcarlson$meenylatex$MeenyLatex$Parser$words = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(elm$core$Basics$identity),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
	A2(elm$parser$Parser$ignorer, jxxcarlson$meenylatex$MeenyLatex$Parser$words_, jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws));
var jxxcarlson$meenylatex$MeenyLatex$Parser$item = A2(
	elm$parser$Parser$map,
	function (x) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$Parser$Item,
			1,
			jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList(x));
	},
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(elm$core$Basics$identity),
						jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
					elm$parser$Parser$symbol('\\item')),
				elm$parser$Parser$symbol(' ')),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
		A2(
			elm$parser$Parser$ignorer,
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Parser$words,
							jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
							jxxcarlson$meenylatex$MeenyLatex$Parser$macro(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces)
						]))),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws)));
var jxxcarlson$meenylatex$MeenyLatex$Parser$itemEnvironmentBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$map,
			A2(jxxcarlson$meenylatex$MeenyLatex$Parser$Environment, envType, _List_Nil),
			A2(
				elm$parser$Parser$map,
				jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(elm$core$Basics$identity),
						jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(jxxcarlson$meenylatex$MeenyLatex$Parser$item),
								jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
							elm$parser$Parser$symbol(endWoord)),
						jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws))));
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$passThroughBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$map,
			A2(jxxcarlson$meenylatex$MeenyLatex$Parser$Environment, envType, _List_Nil),
			A2(
				elm$parser$Parser$map,
				jxxcarlson$meenylatex$MeenyLatex$Parser$LXString,
				A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(elm$core$Basics$identity),
					A2(
						elm$parser$Parser$ignorer,
						jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$parseTo(endWoord),
						jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws))));
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$inSpecialWord = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr(' ')) || (_Utils_eq(
		c,
		_Utils_chr('\n')) || (_Utils_eq(
		c,
		_Utils_chr('\\')) || _Utils_eq(
		c,
		_Utils_chr('$')))));
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$specialWord = jxxcarlson$meenylatex$MeenyLatex$Parser$word(jxxcarlson$meenylatex$MeenyLatex$Parser$inSpecialWord);
var jxxcarlson$meenylatex$MeenyLatex$Parser$specialWords = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LXString,
	A2(
		elm$parser$Parser$map,
		elm$core$String$join(' '),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(jxxcarlson$meenylatex$MeenyLatex$Parser$specialWord)));
var jxxcarlson$meenylatex$MeenyLatex$Parser$tableCell = A2(
	elm$parser$Parser$keeper,
	elm$parser$Parser$succeed(elm$core$Basics$identity),
	elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
				jxxcarlson$meenylatex$MeenyLatex$Parser$specialWords
			])));
var jxxcarlson$meenylatex$MeenyLatex$Parser$nextCell = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			elm$parser$Parser$symbol('&')),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
	jxxcarlson$meenylatex$MeenyLatex$Parser$tableCell);
var jxxcarlson$meenylatex$MeenyLatex$Parser$tableCellHelp = function (revCells) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$andThen,
				function (c) {
					return jxxcarlson$meenylatex$MeenyLatex$Parser$tableCellHelp(
						A2(elm$core$List$cons, c, revCells));
				},
				jxxcarlson$meenylatex$MeenyLatex$Parser$nextCell),
				elm$parser$Parser$succeed(
				elm$core$List$reverse(revCells))
			]));
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$tableRow = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$andThen,
					function (c) {
						return jxxcarlson$meenylatex$MeenyLatex$Parser$tableCellHelp(
							_List_fromArray(
								[c]));
					},
					jxxcarlson$meenylatex$MeenyLatex$Parser$tableCell),
				jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						elm$parser$Parser$symbol('\n'),
						elm$parser$Parser$symbol('\\\\\n')
					])))));
var jxxcarlson$meenylatex$MeenyLatex$Parser$tableBody = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(jxxcarlson$meenylatex$MeenyLatex$Parser$tableRow)));
var jxxcarlson$meenylatex$MeenyLatex$Parser$tabularEnvironmentBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(
						jxxcarlson$meenylatex$MeenyLatex$Parser$Environment(envType)),
					jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
				jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(jxxcarlson$meenylatex$MeenyLatex$Parser$arg)),
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(elm$parser$Parser$ignorer, jxxcarlson$meenylatex$MeenyLatex$Parser$tableBody, jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
					elm$parser$Parser$symbol(endWoord)),
				jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws));
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$parseEnvironmentDict = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'enumerate',
			F2(
				function (endWoord, envType) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$Parser$itemEnvironmentBody, endWoord, envType);
				})),
			_Utils_Tuple2(
			'itemize',
			F2(
				function (endWoord, envType) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$Parser$itemEnvironmentBody, endWoord, envType);
				})),
			_Utils_Tuple2(
			'tabular',
			F2(
				function (endWoord, envType) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$Parser$tabularEnvironmentBody, endWoord, envType);
				})),
			_Utils_Tuple2(
			'passThrough',
			F2(
				function (endWoord, envType) {
					return A2(jxxcarlson$meenylatex$MeenyLatex$Parser$passThroughBody, endWoord, envType);
				}))
		]));
var jxxcarlson$meenylatex$MeenyLatex$Parser$SMacro = F4(
	function (a, b, c, d) {
		return {$: 'SMacro', a: a, b: b, c: c, d: d};
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$smacroBody = A2(
	elm$parser$Parser$map,
	function (x) {
		return jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList(x);
	},
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
		A2(
			elm$parser$Parser$ignorer,
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Parser$specialWords,
							jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
							jxxcarlson$meenylatex$MeenyLatex$Parser$macro(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces)
						]))),
			elm$parser$Parser$symbol('\n\n'))));
var jxxcarlson$meenylatex$MeenyLatex$Parser$smacroName = elm$parser$Parser$variable(
	{
		inner: function (c) {
			return elm$core$Char$isAlphaNum(c);
		},
		reserved: elm$core$Set$fromList(
			_List_fromArray(
				['\\begin', '\\end', '\\item'])),
		start: function (c) {
			return _Utils_eq(
				c,
				_Utils_chr('\\'));
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$smacro = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(jxxcarlson$meenylatex$MeenyLatex$Parser$SMacro),
				jxxcarlson$meenylatex$MeenyLatex$Parser$smacroName),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(jxxcarlson$meenylatex$MeenyLatex$Parser$optionalArg)),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(jxxcarlson$meenylatex$MeenyLatex$Parser$arg)),
	jxxcarlson$meenylatex$MeenyLatex$Parser$smacroBody);
var jxxcarlson$meenylatex$MeenyLatex$Parser$Comment = function (a) {
	return {$: 'Comment', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$texComment = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$Comment,
	elm$parser$Parser$getChompedString(
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(_Utils_Tuple0),
						elm$parser$Parser$chompIf(
							function (c) {
								return _Utils_eq(
									c,
									_Utils_chr('%'));
							})),
					elm$parser$Parser$chompWhile(
						function (c) {
							return !_Utils_eq(
								c,
								_Utils_chr('\n'));
						})),
				elm$parser$Parser$chompIf(
					function (c) {
						return _Utils_eq(
							c,
							_Utils_chr('\n'));
					})),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws)));
var jxxcarlson$meenylatex$MeenyLatex$Parser$environmentOfType = function (envType) {
	var theEndWord = '\\end{' + (envType + '}');
	var envKind = A2(
		elm$core$List$member,
		envType,
		_List_fromArray(
			['equation', 'align', 'eqnarray', 'verbatim', 'listing', 'verse'])) ? 'passThrough' : envType;
	return A3(jxxcarlson$meenylatex$MeenyLatex$Parser$environmentParser, envKind, theEndWord, envType);
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$environmentParser = F3(
	function (envKind, theEndWord, envType) {
		var _n1 = A2(elm$core$Dict$get, envKind, jxxcarlson$meenylatex$MeenyLatex$Parser$parseEnvironmentDict);
		if (_n1.$ === 'Just') {
			var p = _n1.a;
			return A2(p, theEndWord, envType);
		} else {
			return A2(jxxcarlson$meenylatex$MeenyLatex$Parser$standardEnvironmentBody, theEndWord, envType);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$standardEnvironmentBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$map,
			A2(jxxcarlson$meenylatex$MeenyLatex$Parser$Environment, envType, _List_Nil),
			A2(
				elm$parser$Parser$map,
				jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(elm$core$Basics$identity),
						jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(
									jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$latexExpression()),
								jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
							elm$parser$Parser$symbol(endWoord)),
						jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws))));
	});
function jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$environment() {
	return A2(elm$parser$Parser$andThen, jxxcarlson$meenylatex$MeenyLatex$Parser$environmentOfType, jxxcarlson$meenylatex$MeenyLatex$Parser$envName);
}
function jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$latexExpression() {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				jxxcarlson$meenylatex$MeenyLatex$Parser$texComment,
				jxxcarlson$meenylatex$MeenyLatex$Parser$displayMathDollar,
				jxxcarlson$meenylatex$MeenyLatex$Parser$displayMathBrackets,
				jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
				jxxcarlson$meenylatex$MeenyLatex$Parser$macro(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
				jxxcarlson$meenylatex$MeenyLatex$Parser$smacro,
				jxxcarlson$meenylatex$MeenyLatex$Parser$words,
				elm$parser$Parser$lazy(
				function (_n0) {
					return jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$environment();
				})
			]));
}
try {
	var jxxcarlson$meenylatex$MeenyLatex$Parser$environment = jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$environment();
	jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$environment = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Parser$environment;
	};
	var jxxcarlson$meenylatex$MeenyLatex$Parser$latexExpression = jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$latexExpression();
	jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$latexExpression = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Parser$latexExpression;
	};
} catch ($) {
throw 'Some top-level definitions from `MeenyLatex.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    environment\n  │     ↓\n  │    environmentOfType\n  │     ↓\n  │    environmentParser\n  │     ↓\n  │    latexExpression\n  │     ↓\n  │    standardEnvironmentBody\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$MeenyLatex$Parser$latexList = A2(
	elm$parser$Parser$map,
	jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$nonEmptyItemList(jxxcarlson$meenylatex$MeenyLatex$Parser$latexExpression)));
var jxxcarlson$meenylatex$MeenyLatex$Parser$parse = function (text) {
	var expr = A2(elm$parser$Parser$run, jxxcarlson$meenylatex$MeenyLatex$Parser$latexList, text);
	if (expr.$ === 'Ok') {
		if (expr.a.$ === 'LatexList') {
			var list = expr.a.a;
			return list;
		} else {
			return _List_fromArray(
				[
					jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('yada!')
				]);
		}
	} else {
		var error = expr.a;
		return _List_fromArray(
			[
				jxxcarlson$meenylatex$MeenyLatex$Parser$LXError(error)
			]);
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$parserAccumulatorReducer = A2(jxxcarlson$meenylatex$MeenyLatex$Accumulator$parserReducerTransformer, jxxcarlson$meenylatex$MeenyLatex$Parser$parse, jxxcarlson$meenylatex$MeenyLatex$Accumulator$latexStateReducer);
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$parseAccumulator = F2(
	function (latexState, inputList) {
		return A3(
			elm$core$List$foldl,
			jxxcarlson$meenylatex$MeenyLatex$Accumulator$parserAccumulatorReducer,
			_Utils_Tuple2(_List_Nil, latexState),
			inputList);
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$parseParagraphs = F2(
	function (latexState, paragraphs) {
		return A2(jxxcarlson$meenylatex$MeenyLatex$Accumulator$parseAccumulator, latexState, paragraphs);
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderTransformer = F4(
	function (render, latexStateReducer_, input, acc) {
		var _n0 = acc;
		var outputList = _n0.a;
		var state = _n0.b;
		var newState = A2(latexStateReducer_, input, state);
		var renderedInput = A2(render, newState, input);
		return _Utils_Tuple2(
			_Utils_ap(
				outputList,
				_List_fromArray(
					[renderedInput])),
			newState);
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderAccumulatorReducer = function (renderer) {
	return A2(jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderTransformer, renderer, jxxcarlson$meenylatex$MeenyLatex$Accumulator$latexStateReducer);
};
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderAccumulator = F3(
	function (renderer, latexState, inputList) {
		return A3(
			elm$core$List$foldl,
			jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderAccumulatorReducer(renderer),
			_Utils_Tuple2(_List_Nil, latexState),
			inputList);
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderParagraphs = F3(
	function (renderer, latexState, paragraphs) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderAccumulator(renderer),
			latexState,
			paragraphs);
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$prefixer = F2(
	function (b, k) {
		return 'p.' + (elm$core$String$fromInt(b) + ('.' + elm$core$String$fromInt(k)));
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$makeIdList = function (paragraphs) {
	return A2(
		elm$core$List$map,
		jxxcarlson$meenylatex$MeenyLatex$Differ$prefixer(0),
		A2(
			elm$core$List$range,
			1,
			elm$core$List$length(paragraphs)));
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start = {$: 'Start'};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$fixLine = function (line) {
	return (line === '') ? '\n' : line;
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$joinLines = F2(
	function (a, b) {
		var _n0 = _Utils_Tuple2(a, b);
		_n0$1:
		while (true) {
			_n0$2:
			while (true) {
				switch (_n0.a) {
					case '':
						return b;
					case '\n':
						switch (_n0.b) {
							case '':
								break _n0$1;
							case '\n':
								break _n0$2;
							default:
								break _n0$2;
						}
					default:
						switch (_n0.b) {
							case '':
								break _n0$1;
							case '\n':
								return a + '\n';
							default:
								var aa = _n0.a;
								var bb = _n0.b;
								return aa + ('\n' + bb);
						}
				}
			}
			return '\n' + b;
		}
		return a;
	});
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Error = {$: 'Error'};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$IgnoreLine = {$: 'IgnoreLine'};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock = function (a) {
	return {$: 'InBlock', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph = {$: 'InParagraph'};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$BeginBlock = function (a) {
	return {$: 'BeginBlock', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Blank = {$: 'Blank'};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$EndBlock = function (a) {
	return {$: 'EndBlock', a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Ignore = {$: 'Ignore'};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Text = {$: 'Text'};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$getBeginArg = function (line) {
	var parseResult = A2(elm$parser$Parser$run, jxxcarlson$meenylatex$MeenyLatex$Parser$envName, line);
	var arg = function () {
		if (parseResult.$ === 'Ok') {
			var word = parseResult.a;
			return word;
		} else {
			return '';
		}
	}();
	return arg;
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$endWord = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$spaces),
		elm$parser$Parser$symbol('\\end{')),
	A2(
		elm$parser$Parser$ignorer,
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$parseTo('}'),
		jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws));
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$getEndArg = function (line) {
	var parseResult = A2(elm$parser$Parser$run, jxxcarlson$meenylatex$MeenyLatex$Parser$endWord, line);
	var arg = function () {
		if (parseResult.$ === 'Ok') {
			var word = parseResult.a;
			return word;
		} else {
			return '';
		}
	}();
	return arg;
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$lineType = function (line) {
	return (line === '') ? jxxcarlson$meenylatex$MeenyLatex$Paragraph$Blank : (((line === '\\begin{thebibliography}') || (line === '\\end{thebibliography}')) ? jxxcarlson$meenylatex$MeenyLatex$Paragraph$Ignore : (A2(elm$core$String$startsWith, '\\begin', line) ? jxxcarlson$meenylatex$MeenyLatex$Paragraph$BeginBlock(
		jxxcarlson$meenylatex$MeenyLatex$Paragraph$getBeginArg(line)) : (A2(elm$core$String$startsWith, '\\end', line) ? jxxcarlson$meenylatex$MeenyLatex$Paragraph$EndBlock(
		jxxcarlson$meenylatex$MeenyLatex$Paragraph$getEndArg(line)) : jxxcarlson$meenylatex$MeenyLatex$Paragraph$Text)));
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$nextState = F2(
	function (line, parserState) {
		var _n0 = _Utils_Tuple2(
			parserState,
			jxxcarlson$meenylatex$MeenyLatex$Paragraph$lineType(line));
		_n0$15:
		while (true) {
			switch (_n0.a.$) {
				case 'Start':
					switch (_n0.b.$) {
						case 'Blank':
							var _n1 = _n0.a;
							var _n2 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start;
						case 'Text':
							var _n3 = _n0.a;
							var _n4 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 'BeginBlock':
							var _n5 = _n0.a;
							var arg = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 'Ignore':
							var _n6 = _n0.a;
							var _n7 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$IgnoreLine;
						default:
							break _n0$15;
					}
				case 'IgnoreLine':
					switch (_n0.b.$) {
						case 'Blank':
							var _n8 = _n0.a;
							var _n9 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start;
						case 'Text':
							var _n10 = _n0.a;
							var _n11 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 'BeginBlock':
							var _n12 = _n0.a;
							var arg = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						default:
							break _n0$15;
					}
				case 'InBlock':
					switch (_n0.b.$) {
						case 'Blank':
							var arg = _n0.a.a;
							var _n13 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 'Text':
							var arg = _n0.a.a;
							var _n14 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 'BeginBlock':
							var arg = _n0.a.a;
							var arg2 = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 'EndBlock':
							var arg1 = _n0.a.a;
							var arg2 = _n0.b.a;
							return _Utils_eq(arg1, arg2) ? jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start : jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg1);
						default:
							break _n0$15;
					}
				case 'InParagraph':
					switch (_n0.b.$) {
						case 'Text':
							var _n15 = _n0.a;
							var _n16 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 'BeginBlock':
							var _n17 = _n0.a;
							var str = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 'EndBlock':
							var _n18 = _n0.a;
							var arg = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 'Blank':
							var _n19 = _n0.a;
							var _n20 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start;
						default:
							break _n0$15;
					}
				default:
					break _n0$15;
			}
		}
		return jxxcarlson$meenylatex$MeenyLatex$Paragraph$Error;
	});
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$updateParserRecord = F2(
	function (line, parserRecord) {
		var state2 = A2(jxxcarlson$meenylatex$MeenyLatex$Paragraph$nextState, line, parserRecord.state);
		switch (state2.$) {
			case 'Start':
				return _Utils_update(
					parserRecord,
					{
						currentParagraph: '',
						paragraphList: _Utils_ap(
							parserRecord.paragraphList,
							_List_fromArray(
								[
									A2(jxxcarlson$meenylatex$MeenyLatex$Paragraph$joinLines, parserRecord.currentParagraph, line)
								])),
						state: state2
					});
			case 'InParagraph':
				return _Utils_update(
					parserRecord,
					{
						currentParagraph: A2(jxxcarlson$meenylatex$MeenyLatex$Paragraph$joinLines, parserRecord.currentParagraph, line),
						state: state2
					});
			case 'InBlock':
				var arg = state2.a;
				return _Utils_update(
					parserRecord,
					{
						currentParagraph: A2(
							jxxcarlson$meenylatex$MeenyLatex$Paragraph$joinLines,
							parserRecord.currentParagraph,
							jxxcarlson$meenylatex$MeenyLatex$Paragraph$fixLine(line)),
						state: state2
					});
			case 'IgnoreLine':
				return _Utils_update(
					parserRecord,
					{state: state2});
			default:
				return parserRecord;
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$logicalParagraphParse = function (text) {
	return A3(
		elm$core$List$foldl,
		jxxcarlson$meenylatex$MeenyLatex$Paragraph$updateParserRecord,
		{currentParagraph: '', paragraphList: _List_Nil, state: jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start},
		A2(elm$core$String$split, '\n', text + '\n'));
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$logicalParagraphify = function (text) {
	var lastState = jxxcarlson$meenylatex$MeenyLatex$Paragraph$logicalParagraphParse(text);
	return A2(
		elm$core$List$map,
		function (paragraph) {
			return paragraph + '\n\n\n';
		},
		A2(
			elm$core$List$filter,
			function (x) {
				return x !== '';
			},
			_Utils_ap(
				lastState.paragraphList,
				_List_fromArray(
					[lastState.currentParagraph]))));
};
var jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$createEditRecord = F3(
	function (renderer, latexState, text) {
		var paragraphs = jxxcarlson$meenylatex$MeenyLatex$Paragraph$logicalParagraphify(text);
		var idList = jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$makeIdList(paragraphs);
		var _n0 = A2(jxxcarlson$meenylatex$MeenyLatex$Accumulator$parseParagraphs, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, paragraphs);
		var latexExpressionList = _n0.a;
		var latexState1 = _n0.b;
		var latexState2 = _Utils_update(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState,
			{crossReferences: latexState1.crossReferences, dictionary: latexState1.dictionary, tableOfContents: latexState1.tableOfContents});
		var _n1 = A2(
			jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderParagraphs(renderer),
			latexState2,
			latexExpressionList);
		var renderedParagraphs = _n1.a;
		return A6(jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord, paragraphs, renderedParagraphs, latexState2, idList, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing);
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$DiffRecord = F4(
	function (commonInitialSegment, commonTerminalSegment, middleSegmentInSource, middleSegmentInTarget) {
		return {commonInitialSegment: commonInitialSegment, commonTerminalSegment: commonTerminalSegment, middleSegmentInSource: middleSegmentInSource, middleSegmentInTarget: middleSegmentInTarget};
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$commonInitialSegment = F2(
	function (x, y) {
		if (_Utils_eq(x, _List_Nil)) {
			return _List_Nil;
		} else {
			if (_Utils_eq(y, _List_Nil)) {
				return _List_Nil;
			} else {
				var b = A2(elm$core$List$take, 1, y);
				var a = A2(elm$core$List$take, 1, x);
				return _Utils_eq(a, b) ? _Utils_ap(
					a,
					A2(
						jxxcarlson$meenylatex$MeenyLatex$Differ$commonInitialSegment,
						A2(elm$core$List$drop, 1, x),
						A2(elm$core$List$drop, 1, y))) : _List_Nil;
			}
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$commonTerminalSegmentAux = F3(
	function (cis, x, y) {
		var n = elm$core$List$length(cis);
		var xx = elm$core$List$reverse(
			A2(elm$core$List$drop, n, x));
		var yy = elm$core$List$reverse(
			A2(elm$core$List$drop, n, y));
		return elm$core$List$reverse(
			A2(jxxcarlson$meenylatex$MeenyLatex$Differ$commonInitialSegment, xx, yy));
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$dropLast = F2(
	function (k, x) {
		return elm$core$List$reverse(
			A2(
				elm$core$List$drop,
				k,
				elm$core$List$reverse(x)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$diff = F2(
	function (u, v) {
		var a = A2(jxxcarlson$meenylatex$MeenyLatex$Differ$commonInitialSegment, u, v);
		var b_ = A3(jxxcarlson$meenylatex$MeenyLatex$Differ$commonTerminalSegmentAux, a, u, v);
		var lb = elm$core$List$length(b_);
		var la = elm$core$List$length(a);
		var b = _Utils_eq(
			la,
			elm$core$List$length(u)) ? _List_Nil : b_;
		var x = A2(
			jxxcarlson$meenylatex$MeenyLatex$Differ$dropLast,
			lb,
			A2(elm$core$List$drop, la, u));
		var y = A2(
			jxxcarlson$meenylatex$MeenyLatex$Differ$dropLast,
			lb,
			A2(elm$core$List$drop, la, v));
		return A4(jxxcarlson$meenylatex$MeenyLatex$Differ$DiffRecord, a, b, x, y);
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$differentialIdList = F3(
	function (seed, diffRecord, editRecord) {
		var nt = elm$core$List$length(diffRecord.middleSegmentInTarget);
		var ns = elm$core$List$length(diffRecord.middleSegmentInSource);
		var it = elm$core$List$length(diffRecord.commonTerminalSegment);
		var ii = elm$core$List$length(diffRecord.commonInitialSegment);
		var idListTerminal = A2(elm$core$List$drop, ii + ns, editRecord.idList);
		var idListMiddle = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$Differ$prefixer(seed),
			A2(elm$core$List$range, ii + 1, ii + nt));
		var idListInitial = A2(elm$core$List$take, ii, editRecord.idList);
		var idList = _Utils_ap(
			idListInitial,
			_Utils_ap(idListMiddle, idListTerminal));
		var _n0 = (!nt) ? _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Maybe$Nothing) : _Utils_Tuple2(
			elm$core$Maybe$Just(ii),
			elm$core$Maybe$Just((ii + nt) - 1));
		var newIdsStart = _n0.a;
		var newIdsEnd = _n0.b;
		return {idList: idList, newIdsEnd: newIdsEnd, newIdsStart: newIdsStart};
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$takeLast = F2(
	function (k, x) {
		return elm$core$List$reverse(
			A2(
				elm$core$List$take,
				k,
				elm$core$List$reverse(x)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$differentialRender = F3(
	function (renderer, diffRecord, editRecord) {
		var middleSegmentRendered = A2(elm$core$List$map, renderer, diffRecord.middleSegmentInTarget);
		var it = elm$core$List$length(diffRecord.commonTerminalSegment);
		var terminalSegmentRendered = A2(jxxcarlson$meenylatex$MeenyLatex$Differ$takeLast, it, editRecord.renderedParagraphs);
		var ii = elm$core$List$length(diffRecord.commonInitialSegment);
		var initialSegmentRendered = A2(elm$core$List$take, ii, editRecord.renderedParagraphs);
		return _Utils_ap(
			initialSegmentRendered,
			_Utils_ap(middleSegmentRendered, terminalSegmentRendered));
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$update = F4(
	function (seed, transformer, editRecord, text) {
		var newParagraphs = jxxcarlson$meenylatex$MeenyLatex$Paragraph$logicalParagraphify(text);
		var diffRecord = A2(jxxcarlson$meenylatex$MeenyLatex$Differ$diff, editRecord.paragraphs, newParagraphs);
		var newRenderedParagraphs = A3(jxxcarlson$meenylatex$MeenyLatex$Differ$differentialRender, transformer, diffRecord, editRecord);
		var p = A3(jxxcarlson$meenylatex$MeenyLatex$Differ$differentialIdList, seed, diffRecord, editRecord);
		return A6(jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord, newParagraphs, newRenderedParagraphs, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, p.idList, p.newIdsStart, p.newIdsEnd);
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$update_ = F4(
	function (seed, renderer, editorRecord, text) {
		return A4(
			jxxcarlson$meenylatex$MeenyLatex$Differ$update,
			seed,
			renderer(editorRecord.latexState),
			editorRecord,
			text);
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$update = F5(
	function (seed, renderLatexExpression, renderString, editRecord, content) {
		return jxxcarlson$meenylatex$MeenyLatex$Differ$isEmpty(editRecord) ? A2(
			jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$createEditRecord(renderLatexExpression),
			jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState,
			content) : A4(jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$update_, seed, renderString, editRecord, content);
	});
var elm$html$Html$i = _VirtualDom_node('i');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$nextInternalState = function (internalState_) {
	var nextInputList_ = A2(elm$core$List$drop, 1, internalState_.inputList);
	return {
		after: elm$core$List$head(
			A2(elm$core$List$drop, 1, nextInputList_)),
		before: internalState_.current,
		current: internalState_.after,
		inputList: nextInputList_
	};
};
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$makeReducer = F3(
	function (computeOutput, input, machineState) {
		var nextInternalState_ = jxxcarlson$meenylatex$MeenyLatex$ListMachine$nextInternalState(machineState.internalstate);
		var nextInputList = A2(elm$core$List$drop, 1, machineState.internalstate.inputList);
		var newOutput = computeOutput(machineState.internalstate);
		var outputList = A2(elm$core$List$cons, newOutput, machineState.outputList);
		return {internalstate: nextInternalState_, outputList: outputList};
	});
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$initialInternalState = function (inputList) {
	return {
		after: elm$core$List$head(
			A2(elm$core$List$drop, 1, inputList)),
		before: elm$core$Maybe$Nothing,
		current: elm$core$List$head(inputList),
		inputList: inputList
	};
};
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$initialMachineState = function (inputList) {
	return {
		internalstate: jxxcarlson$meenylatex$MeenyLatex$ListMachine$initialInternalState(inputList),
		outputList: _List_Nil
	};
};
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$run_ = F3(
	function (reducer, initialMachineState_, inputList) {
		return A3(elm$core$List$foldl, reducer, initialMachineState_, inputList);
	});
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$run = F2(
	function (reducer, inputList) {
		var initialMachineState_ = jxxcarlson$meenylatex$MeenyLatex$ListMachine$initialMachineState(inputList);
		var finalState = A3(jxxcarlson$meenylatex$MeenyLatex$ListMachine$run_, reducer, initialMachineState_, inputList);
		return elm$core$List$reverse(finalState.outputList);
	});
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$runMachine = F2(
	function (outputFunction, inputList) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$ListMachine$run,
			jxxcarlson$meenylatex$MeenyLatex$ListMachine$makeReducer(outputFunction),
			inputList);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$firstChar = elm$core$String$left(1);
var jxxcarlson$meenylatex$MeenyLatex$Render2$lastChar = elm$core$String$right(1);
var jxxcarlson$meenylatex$MeenyLatex$Render2$addSpace = function (internalState) {
	var c = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(''),
		internalState.after);
	var b = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(''),
		internalState.current);
	var a = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(''),
		internalState.before);
	var _n0 = _Utils_Tuple3(a, b, c);
	if (_n0.b.$ === 'LXString') {
		switch (_n0.a.$) {
			case 'Macro':
				var _n1 = _n0.a;
				var str = _n0.b.a;
				return A2(
					elm$core$List$member,
					jxxcarlson$meenylatex$MeenyLatex$Render2$firstChar(str),
					_List_fromArray(
						['.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(str) : jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(' ' + str);
			case 'InlineMath':
				var str = _n0.b.a;
				return A2(
					elm$core$List$member,
					jxxcarlson$meenylatex$MeenyLatex$Render2$firstChar(str),
					_List_fromArray(
						['.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(str) : jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(' ' + str);
			default:
				var str = _n0.b.a;
				return A2(
					elm$core$List$member,
					jxxcarlson$meenylatex$MeenyLatex$Render2$lastChar(str),
					_List_fromArray(
						[')', '.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(str + ' ') : jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(str);
		}
	} else {
		return b;
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$boost = function (f) {
	return F3(
		function (x, y, z) {
			return A2(f, x, z);
		});
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$mathText = function (content) {
	return A3(
		elm$html$Html$node,
		'math-text',
		_List_fromArray(
			[
				A2(
				elm$html$Html$Attributes$property,
				'content',
				elm$json$Json$Encode$string(content))
			]),
		_List_Nil);
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText = function (str) {
	return jxxcarlson$meenylatex$MeenyLatex$Render2$mathText(
		'$$\n' + (elm$core$String$trim(str) + '\n$$'));
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$enclose = function (msg) {
	return A2(
		elm$html$Html$span,
		_List_Nil,
		_List_fromArray(
			[
				elm$html$Html$text('{'),
				msg,
				elm$html$Html$text('}')
			]));
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$getElement = F2(
	function (k, list) {
		return A2(
			elm$core$Maybe$withDefault,
			jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('xxx'),
			A2(jxxcarlson$meenylatex$MeenyLatex$Utility$getAt, k, list));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$inlineMathText = function (str) {
	return jxxcarlson$meenylatex$MeenyLatex$Render2$mathText(
		'$ ' + (elm$core$String$trim(str) + ' $'));
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$itemClass = function (level) {
	return 'item' + elm$core$String$fromInt(level);
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$oneSpace = elm$html$Html$text(' ');
var elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var jxxcarlson$meenylatex$MeenyLatex$ErrorMessages$renderError = function (error) {
	return '<div style=\"color: red\">ERROR: ' + (elm$parser$Parser$deadEndsToString(
		_List_fromArray(
			[error])) + ('</div>\n' + ('<div style=\"color: blue\">' + ('explanation_' + '</div>'))));
};
var jxxcarlson$meenylatex$MeenyLatex$Html$div = F2(
	function (attributes, children) {
		var childrenString = A2(elm$core$String$join, '\n', children);
		var attributeString = A2(elm$core$String$join, ' ', attributes);
		return '<div ' + (attributeString + (' >\n' + (childrenString + '\n</div>')));
	});
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$NoSpace = {$: 'NoSpace'};
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$Space = {$: 'Space'};
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$firstChar = elm$core$String$left(1);
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$lastChar = elm$core$String$right(1);
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinType = F2(
	function (l, r) {
		var lastCharLeft = jxxcarlson$meenylatex$MeenyLatex$JoinStrings$lastChar(l);
		var firstCharRight = jxxcarlson$meenylatex$MeenyLatex$JoinStrings$firstChar(r);
		return (l === '') ? jxxcarlson$meenylatex$MeenyLatex$JoinStrings$NoSpace : (A2(
			elm$core$List$member,
			lastCharLeft,
			_List_fromArray(
				['('])) ? jxxcarlson$meenylatex$MeenyLatex$JoinStrings$NoSpace : (A2(
			elm$core$List$member,
			firstCharRight,
			_List_fromArray(
				[')', '.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$MeenyLatex$JoinStrings$NoSpace : jxxcarlson$meenylatex$MeenyLatex$JoinStrings$Space));
	});
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinDatum2String = F2(
	function (current, datum) {
		var _n0 = datum;
		var acc = _n0.a;
		var previous = _n0.b;
		var _n1 = A2(jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinType, previous, current);
		if (_n1.$ === 'NoSpace') {
			return _Utils_Tuple2(
				_Utils_ap(acc, current),
				current);
		} else {
			return _Utils_Tuple2(acc + (' ' + current), current);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinList = function (stringList) {
	var start = A2(
		elm$core$Maybe$withDefault,
		'',
		elm$core$List$head(stringList));
	return A3(
		elm$core$List$foldl,
		jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinDatum2String,
		_Utils_Tuple2('', ''),
		stringList).a;
};
var jxxcarlson$meenylatex$MeenyLatex$Render$getElement = F2(
	function (k, list) {
		return A2(
			elm$core$Maybe$withDefault,
			jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('xxx'),
			A2(jxxcarlson$meenylatex$MeenyLatex$Utility$getAt, k, list));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$itemClass = function (level) {
	return 'item' + elm$core$String$fromInt(level);
};
var jxxcarlson$meenylatex$MeenyLatex$Render$postProcess = function (str) {
	return A3(
		elm$core$String$replace,
		'\\&',
		'&#38',
		A3(
			elm$core$String$replace,
			'--',
			'&ndash;',
			A3(elm$core$String$replace, '---', '&mdash;', str)));
};
var jxxcarlson$meenylatex$MeenyLatex$Render$renderComment = function (str) {
	return '';
};
var jxxcarlson$meenylatex$MeenyLatex$Render$renderCommentEnvironment = F2(
	function (latexState, body) {
		return '';
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderCell = function (cell) {
	switch (cell.$) {
		case 'LXString':
			var s = cell.a;
			return '<td>' + (s + '</td>');
		case 'InlineMath':
			var s = cell.a;
			return '<td>$' + (s + '$</td>');
		default:
			return '<td>-</td>';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render$renderRow = function (row) {
	if (row.$ === 'LatexList') {
		var row_ = row.a;
		return function (row__) {
			return '<tr> ' + (row__ + ' </tr>\n');
		}(
			A3(
				elm$core$List$foldl,
				F2(
					function (cell, acc) {
						return acc + (' ' + jxxcarlson$meenylatex$MeenyLatex$Render$renderCell(cell));
					}),
				'',
				row_));
	} else {
		return '<tr>-</tr>';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render$renderTableBody = function (body) {
	if (body.$ === 'LatexList') {
		var body_ = body.a;
		return function (bod) {
			return '<table>\n' + (bod + '</table>\n');
		}(
			A3(
				elm$core$List$foldl,
				F2(
					function (row, acc) {
						return acc + (' ' + jxxcarlson$meenylatex$MeenyLatex$Render$renderRow(row));
					}),
				'',
				body_));
	} else {
		return '<table>-</table>';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render$renderTabular = F2(
	function (latexState, body) {
		return jxxcarlson$meenylatex$MeenyLatex$Render$renderTableBody(body);
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var jxxcarlson$meenylatex$MeenyLatex$Utility$numberedLine = F2(
	function (k, line) {
		return A3(
			elm$core$String$padLeft,
			2,
			_Utils_chr(' '),
			elm$core$String$fromInt(k)) + (' ' + line);
	});
var jxxcarlson$meenylatex$MeenyLatex$Utility$addNumberedLine = F2(
	function (line, data) {
		var _n0 = data;
		var k = _n0.a;
		var lines = _n0.b;
		return _Utils_Tuple2(
			k + 1,
			_Utils_ap(
				_List_fromArray(
					[
						A2(jxxcarlson$meenylatex$MeenyLatex$Utility$numberedLine, k + 1, line)
					]),
				lines));
	});
var jxxcarlson$meenylatex$MeenyLatex$Utility$addLineNumbers = function (text) {
	return A2(
		elm$core$String$join,
		'\n',
		elm$core$List$reverse(
			A3(
				elm$core$List$foldl,
				jxxcarlson$meenylatex$MeenyLatex$Utility$addNumberedLine,
				_Utils_Tuple2(0, _List_Nil),
				A2(
					elm$core$String$split,
					'\n',
					elm$core$String$trim(text))).b));
};
var jxxcarlson$meenylatex$MeenyLatex$Render$environmentRenderer = function (name) {
	var _n3 = A2(
		elm$core$Dict$get,
		name,
		jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderEnvironmentDict());
	if (_n3.$ === 'Just') {
		var f = _n3.a;
		return f;
	} else {
		return jxxcarlson$meenylatex$MeenyLatex$Render$renderDefaultEnvironment(name);
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render$macroRenderer = F4(
	function (name, latexState, optArgs, args) {
		var _n2 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderMacroDict());
		if (_n2.$ === 'Just') {
			var f = _n2.a;
			return A3(f, latexState, optArgs, args);
		} else {
			return A4(jxxcarlson$meenylatex$MeenyLatex$Render$reproduceMacro, name, latexState, optArgs, args);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$render = F2(
	function (latexState, latexExpression) {
		switch (latexExpression.$) {
			case 'Comment':
				var str = latexExpression.a;
				return jxxcarlson$meenylatex$MeenyLatex$Render$renderComment(str);
			case 'Macro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render$renderMacro, latexState, name, optArgs, args);
			case 'SMacro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				var le = latexExpression.d;
				return A5(jxxcarlson$meenylatex$MeenyLatex$Render$renderSMacro, latexState, name, optArgs, args, le);
			case 'Item':
				var level = latexExpression.a;
				var latexExpr = latexExpression.b;
				return A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderItem, latexState, level, latexExpr);
			case 'InlineMath':
				var str = latexExpression.a;
				return '$' + (str + '$');
			case 'DisplayMath':
				var str = latexExpression.a;
				return '$$' + (str + '$$');
			case 'Environment':
				var name = latexExpression.a;
				var args = latexExpression.b;
				var body = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render$renderEnvironment, latexState, name, args, body);
			case 'LatexList':
				var args = latexExpression.a;
				return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderLatexList, latexState, args);
			case 'LXString':
				var str = latexExpression.a;
				return str;
			default:
				var error = latexExpression.a;
				return A2(
					elm$core$String$join,
					'; ',
					A2(elm$core$List$map, jxxcarlson$meenylatex$MeenyLatex$ErrorMessages$renderError, error));
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderAlignEnvironment = F2(
	function (latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var r = A3(
			elm$core$String$replace,
			'\\ \\',
			'\\\\',
			A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body));
		var eqno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'eqno', latexState);
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		return '\n$$\n\\begin{align}\n' + (addendum + (r + '\n\\end{align}\n$$\n'));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderArg = F3(
	function (k, latexState, args) {
		return elm$core$String$trim(
			A2(
				jxxcarlson$meenylatex$MeenyLatex$Render$render,
				latexState,
				A2(jxxcarlson$meenylatex$MeenyLatex$Render$getElement, k, args)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderArgList = F2(
	function (latexState, args) {
		return A2(
			elm$core$String$join,
			'',
			A2(
				elm$core$List$map,
				function (x) {
					return '{' + (x + '}');
				},
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$MeenyLatex$Render$render(latexState),
					args)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderBibItem = F4(
	function (latexState, optArgs, args, body) {
		var label = (elm$core$List$length(optArgs) === 1) ? A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, optArgs) : A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		return ' <p id=\"bib:' + (label + ('\">[' + (label + ('] ' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body) + '</p>\n')))));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderBozo = F2(
	function (latexState, args) {
		return 'bozo{' + (A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args) + ('}{' + (A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, latexState, args) + '}')));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderCenterEnvironment = F2(
	function (latexState, body) {
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		return '\n<div class=\"center\" >\n' + (r + '\n</div>\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderDefaultEnvironment = F4(
	function (name, latexState, args, body) {
		return A2(
			elm$core$List$member,
			name,
			_List_fromArray(
				['theorem', 'proposition', 'corollary', 'lemma', 'definition'])) ? A4(jxxcarlson$meenylatex$MeenyLatex$Render$renderTheoremLikeEnvironment, latexState, name, args, body) : A4(jxxcarlson$meenylatex$MeenyLatex$Render$renderDefaultEnvironment2, latexState, name, args, body);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderDefaultEnvironment2 = F4(
	function (latexState, name, args, body) {
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		return '\n<div class=\"environment\">\n<strong>' + (name + ('</strong>\n<div>\n' + (r + '\n</div>\n</div>\n')));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderEnumerate = F2(
	function (latexState, body) {
		return '\n<ol>\n' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body) + '\n</ol>\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderEnvironment = F4(
	function (latexState, name, args, body) {
		return A4(jxxcarlson$meenylatex$MeenyLatex$Render$environmentRenderer, name, latexState, args, body);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderEqnArray = F2(
	function (latexState, body) {
		return '\n$$\n' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body) + '\n$$\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderEquationEnvironment = F2(
	function (latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'eqno', latexState);
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		return '\n$$\n\\begin{equation}' + (addendum + (r + '\\end{equation}\n$$\n'));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderIndentEnvironment = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$Html$div,
			_List_fromArray(
				['style=\"margin-left:2em\"']),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderItem = F3(
	function (latexState, level, latexExpression) {
		return '<li class=\"' + (jxxcarlson$meenylatex$MeenyLatex$Render$itemClass(level) + ('\">' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, latexExpression) + '</li>\n')));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderItemize = F2(
	function (latexState, body) {
		return '\n<ul>\n' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body) + '\n</ul>\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderLatexList = F2(
	function (latexState, args) {
		return jxxcarlson$meenylatex$MeenyLatex$Render$postProcess(
			jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinList(
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$MeenyLatex$Render$render(latexState),
					args)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderListing = F2(
	function (latexState, body) {
		var text = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		return '\n<pre class=\"verbatim\">' + (jxxcarlson$meenylatex$MeenyLatex$Utility$addLineNumbers(text) + '</pre>\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderMacro = F4(
	function (latexState, name, optArgs, args) {
		return A3(
			jxxcarlson$meenylatex$MeenyLatex$Render$macroRenderer(name),
			latexState,
			optArgs,
			args);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderMacros = F2(
	function (latexState, body) {
		return '\n$$\n' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body) + '\n$$\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderOptArgList = F2(
	function (latexState, args) {
		return A2(
			elm$core$String$join,
			'',
			A2(
				elm$core$List$map,
				function (x) {
					return '[' + (x + ']');
				},
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$MeenyLatex$Render$render(latexState),
					args)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderQuotation = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$Html$div,
			_List_fromArray(
				['class=\"quotation\"']),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderSMacro = F5(
	function (latexState, name, optArgs, args, le) {
		var _n0 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderSMacroDict());
		if (_n0.$ === 'Just') {
			var f = _n0.a;
			return A4(f, latexState, optArgs, args, le);
		} else {
			return '<span style=\"color: red;\">\\' + (name + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderArgList, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, args) + (' ' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, le) + '</span>'))));
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderTheBibliography = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$Html$div,
			_List_fromArray(
				['style=\"\"']),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderTheoremLikeEnvironment = F4(
	function (latexState, name, args, body) {
		var tno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'tno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var tnoString = (s1 > 0) ? (' ' + (elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(tno)))) : (' ' + elm$core$String$fromInt(tno));
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'eqno', latexState);
		return '\n<div class=\"environment\">\n<strong>' + (name + (tnoString + ('</strong>\n<div class=\"italic\">\n' + (r + '\n</div>\n</div>\n'))));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderUseForWeb = F2(
	function (latexState, body) {
		return '\n$$\n' + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body) + '\n$$\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderVerbatim = F2(
	function (latexState, body) {
		var body2 = A3(
			elm$core$String$replace,
			'<',
			'&lt;',
			A3(
				elm$core$String$replace,
				'>',
				'&gt;',
				A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body)));
		return '\n<pre class=\"verbatim\">' + (body2 + '</pre>\n');
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$renderVerse = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$Html$div,
			_List_fromArray(
				['class=\"verse\"']),
			_List_fromArray(
				[
					elm$core$String$trim(
					A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$reproduceMacro = F4(
	function (name, latexState, optArgs, args) {
		return '<span style=\"color: red;\">\\' + (name + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderOptArgList, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, optArgs) + (A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderArgList, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, args) + '</span>')));
	});
function jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderEnvironmentDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'align',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderAlignEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'center',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderCenterEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'comment',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderCommentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'indent',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderIndentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'enumerate',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderEnumerate, x, y);
					})),
				_Utils_Tuple2(
				'eqnarray',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderEqnArray, x, y);
					})),
				_Utils_Tuple2(
				'equation',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderEquationEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'itemize',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderItemize, x, y);
					})),
				_Utils_Tuple2(
				'listing',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderListing, x, y);
					})),
				_Utils_Tuple2(
				'macros',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderMacros, x, y);
					})),
				_Utils_Tuple2(
				'quotation',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderQuotation, x, y);
					})),
				_Utils_Tuple2(
				'tabular',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderTabular, x, y);
					})),
				_Utils_Tuple2(
				'thebibliography',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderTheBibliography, x, y);
					})),
				_Utils_Tuple2(
				'maskforweb',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderCommentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'useforweb',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderUseForWeb, x, y);
					})),
				_Utils_Tuple2(
				'verbatim',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderVerbatim, x, y);
					})),
				_Utils_Tuple2(
				'verse',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderVerse, x, y);
					}))
			]));
}
function jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderMacroDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'italic',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderBozo, x, z);
					}))
			]));
}
function jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderSMacroDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'bibitem',
				F4(
					function (latexState, optArgs, args, body) {
						return A4(jxxcarlson$meenylatex$MeenyLatex$Render$renderBibItem, latexState, optArgs, args, body);
					}))
			]));
}
try {
	var jxxcarlson$meenylatex$MeenyLatex$Render$renderEnvironmentDict = jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderEnvironmentDict();
	jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderEnvironmentDict = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Render$renderEnvironmentDict;
	};
	var jxxcarlson$meenylatex$MeenyLatex$Render$renderMacroDict = jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderMacroDict();
	jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderMacroDict = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Render$renderMacroDict;
	};
	var jxxcarlson$meenylatex$MeenyLatex$Render$renderSMacroDict = jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderSMacroDict();
	jxxcarlson$meenylatex$MeenyLatex$Render$cyclic$renderSMacroDict = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Render$renderSMacroDict;
	};
} catch ($) {
throw 'Some top-level definitions from `MeenyLatex.Render` are causing infinite recursion:\n\n  ┌─────┐\n  │    environmentRenderer\n  │     ↓\n  │    macroRenderer\n  │     ↓\n  │    render\n  │     ↓\n  │    renderAlignEnvironment\n  │     ↓\n  │    renderArg\n  │     ↓\n  │    renderArgList\n  │     ↓\n  │    renderBibItem\n  │     ↓\n  │    renderBozo\n  │     ↓\n  │    renderCenterEnvironment\n  │     ↓\n  │    renderDefaultEnvironment\n  │     ↓\n  │    renderDefaultEnvironment2\n  │     ↓\n  │    renderEnumerate\n  │     ↓\n  │    renderEnvironment\n  │     ↓\n  │    renderEnvironmentDict\n  │     ↓\n  │    renderEqnArray\n  │     ↓\n  │    renderEquationEnvironment\n  │     ↓\n  │    renderIndentEnvironment\n  │     ↓\n  │    renderItem\n  │     ↓\n  │    renderItemize\n  │     ↓\n  │    renderLatexList\n  │     ↓\n  │    renderListing\n  │     ↓\n  │    renderMacro\n  │     ↓\n  │    renderMacroDict\n  │     ↓\n  │    renderMacros\n  │     ↓\n  │    renderOptArgList\n  │     ↓\n  │    renderQuotation\n  │     ↓\n  │    renderSMacro\n  │     ↓\n  │    renderSMacroDict\n  │     ↓\n  │    renderTheBibliography\n  │     ↓\n  │    renderTheoremLikeEnvironment\n  │     ↓\n  │    renderUseForWeb\n  │     ↓\n  │    renderVerbatim\n  │     ↓\n  │    renderVerse\n  │     ↓\n  │    reproduceMacro\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderAlignEnvironment = F2(
	function (latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'eqno', latexState);
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		var content = '\n\\begin{align}\n' + (addendum + (r + '\n\\end{align}\n'));
		return jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText(content);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderAuthor = F2(
	function (latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderBigSkip = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(elm$html$Html$br, _List_Nil, _List_Nil)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$getDictionaryItem = F2(
	function (key, latexState) {
		var _n0 = A2(elm$core$Dict$get, key, latexState.dictionary);
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return value;
		} else {
			return '';
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderCite = F2(
	function (latexState, args) {
		var label_ = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getDictionaryItem, 'bibitem:' + label_, latexState);
		var label = (ref !== '') ? ref : label_;
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('[')
						])),
					A2(
					elm$html$Html$a,
					_List_fromArray(
						[
							elm$html$Html$Attributes$href(label)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						])),
					A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(']')
						]))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderCommentEnvironment = F2(
	function (latexState, body) {
		return A2(elm$html$Html$div, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderDate = F2(
	function (latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderDocumentTitle = F2(
	function (latexState, list) {
		var title = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getDictionaryItem, 'title', latexState);
		var titlePart = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('title')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title)
				]));
		var revision = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getDictionaryItem, 'revision', latexState);
		var revisionText = (revision !== '') ? ('Last revised ' + revision) : '';
		var email = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getDictionaryItem, 'email', latexState);
		var date = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getDictionaryItem, 'date', latexState);
		var author = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getDictionaryItem, 'author', latexState);
		var bodyParts = A2(
			elm$core$List$map,
			function (x) {
				return A2(
					elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(x)
						]));
			},
			A2(
				elm$core$List$filter,
				function (x) {
					return x !== '';
				},
				_List_fromArray(
					[author, email, date, revisionText])));
		var bodyPart = A2(elm$html$Html$ul, _List_Nil, bodyParts);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[titlePart, bodyPart]));
	});
var elm$html$Html$iframe = _VirtualDom_node('iframe');
var elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		elm$core$String$fromInt(n));
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEllie = F2(
	function (latexState, args) {
		var title_ = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, latexState, args);
		var title = (title_ === 'xxx') ? 'Link to Ellie' : title_;
		var id = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var url = 'https://ellie-app.com/embed/' + id;
		return A2(
			elm$html$Html$iframe,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$width(500),
					elm$html$Html$Attributes$height(600)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEmail = F2(
	function (latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$getCrossReference = F2(
	function (label, latexState) {
		var _n0 = A2(elm$core$Dict$get, label, latexState.crossReferences);
		if (_n0.$ === 'Just') {
			var ref = _n0.a;
			return ref;
		} else {
			return '??';
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEqRef = F2(
	function (latexState, args) {
		var key = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, args);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCrossReference, key, latexState);
		return A2(
			elm$html$Html$i,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('('),
					elm$html$Html$text(ref),
					elm$html$Html$text(')')
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEqnArray = F2(
	function (latexState, body) {
		return jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText(
			A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEquationEnvironment = F2(
	function (latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'eqno', latexState);
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		return jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText('\\begin{equation}' + (r + (addendum + '\\end{equation}')));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderHRef = F2(
	function (latexState, args) {
		var url = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, args);
		var label = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, args);
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(url)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var elm$html$Html$caption = _VirtualDom_node('caption');
var elm$html$Html$Attributes$align = elm$html$Html$Attributes$stringProperty('align');
var jxxcarlson$meenylatex$MeenyLatex$Image$ImageAttributes = F3(
	function (width, _float, align) {
		return {align: align, _float: _float, width: width};
	});
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$parser$Parser$Advanced$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || (_Utils_eq(
			c,
			_Utils_chr('\n')) || _Utils_eq(
			c,
			_Utils_chr('\r')));
	});
var elm$parser$Parser$spaces = elm$parser$Parser$Advanced$spaces;
var jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$keyValuePair = A2(
	elm$parser$Parser$map,
	function (_n0) {
		var a = _n0.a;
		var b = _n0.b;
		return _Utils_Tuple2(
			elm$core$String$trim(a),
			elm$core$String$trim(b));
	},
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(elm$core$Tuple$pair),
				elm$parser$Parser$spaces),
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						jxxcarlson$meenylatex$MeenyLatex$Parser$word(
							function (c) {
								return !_Utils_eq(
									c,
									_Utils_chr(':'));
							}),
						elm$parser$Parser$spaces),
					elm$parser$Parser$symbol(':')),
				elm$parser$Parser$spaces)),
		jxxcarlson$meenylatex$MeenyLatex$Parser$word(
			function (c) {
				return !_Utils_eq(
					c,
					_Utils_chr(','));
			})));
var jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$keyValuePairs = A2(
	elm$parser$Parser$keeper,
	elm$parser$Parser$succeed(elm$core$Basics$identity),
	jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$itemList(jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$keyValuePair));
var jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$getKeyValueList = function (str) {
	return A2(
		elm$core$Result$withDefault,
		_List_Nil,
		A2(elm$parser$Parser$run, jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$keyValuePairs, str));
};
var jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$getValue = F2(
	function (key, kvpList) {
		return A2(
			elm$core$Maybe$withDefault,
			'',
			elm$core$List$head(
				A2(
					elm$core$List$map,
					function (x) {
						return x.b;
					},
					A2(
						elm$core$List$filter,
						function (x) {
							return _Utils_eq(x.a, key);
						},
						kvpList))));
	});
var jxxcarlson$meenylatex$MeenyLatex$Image$parseImageAttributes = function (attributeString) {
	var kvList = jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$getKeyValueList(attributeString);
	var widthValue = A2(
		elm$core$Maybe$withDefault,
		200,
		elm$core$String$toInt(
			A2(jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$getValue, 'width', kvList)));
	var floatValue = A2(jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$getValue, 'float', kvList);
	var alignValue = A2(jxxcarlson$meenylatex$MeenyLatex$KeyValueUtilities$getValue, 'align', kvList);
	return A3(jxxcarlson$meenylatex$MeenyLatex$Image$ImageAttributes, widthValue, floatValue, alignValue);
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderImage = F2(
	function (latexState, args) {
		var url = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var label = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, latexState, args);
		var attributeString = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 2, latexState, args);
		var imageAttrs = jxxcarlson$meenylatex$MeenyLatex$Image$parseImageAttributes(attributeString);
		return (imageAttrs._float === 'left') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$alt(label),
					elm$html$Html$Attributes$align('left'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$caption,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				])) : ((imageAttrs._float === 'right') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$alt(label),
					elm$html$Html$Attributes$align('right'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$caption,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				])) : ((imageAttrs.align === 'center') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$alt(label),
					elm$html$Html$Attributes$align('center'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$caption,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				])) : A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$alt(label),
					elm$html$Html$Attributes$align('center'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$caption,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				]))));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderImageRef = F2(
	function (latexState, args) {
		var url = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var imageUrl = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, latexState, args);
		var attributeString = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 2, latexState, args);
		var imageAttrs = jxxcarlson$meenylatex$MeenyLatex$Image$parseImageAttributes(attributeString);
		var theImage = (imageAttrs._float === 'left') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('left'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_Nil) : ((imageAttrs._float === 'right') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('right'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_Nil) : ((imageAttrs.align === 'center') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('center'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_Nil) : A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('center'),
					elm$html$Html$Attributes$width(imageAttrs.width)
				]),
			_List_Nil)));
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(url)
				]),
			_List_fromArray(
				[theImage]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderIndex = F2(
	function (x, z) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderLabel = F2(
	function (x, z) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderListing = F2(
	function (latexState, body) {
		var text = A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body);
		var lines = jxxcarlson$meenylatex$MeenyLatex$Utility$addLineNumbers(text);
		return A2(
			elm$html$Html$pre,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('verbatim')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(lines)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacros = F2(
	function (latexState, body) {
		return jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText(
			A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderMdash = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('---')
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderMedSkip = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(elm$html$Html$br, _List_Nil, _List_Nil)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderNdash = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('--')
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderNewCommand = F2(
	function (latexState, args) {
		var definition = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, latexState, args);
		var command = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('\\newcommand{' + (command + ('}{' + (definition + '}'))))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderRef = F2(
	function (latexState, args) {
		var key = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(
					A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCrossReference, key, latexState))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderRevision = F2(
	function (latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderBibItem = F4(
	function (latexState, optArgs, args, body) {
		var label = (elm$core$List$length(optArgs) === 1) ? A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, optArgs) : A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var id = '\"bib:' + (label + '\"');
		return A2(
			elm$html$Html$p,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(id)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					'[' + (label + ('] ' + A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body))))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSMacroDict = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'bibitem',
			F4(
				function (latexState, optArgs, args, body) {
					return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderBibItem, latexState, optArgs, args, body);
				}))
		]));
var jxxcarlson$meenylatex$MeenyLatex$Render2$userReplace = F3(
	function (userRegex, replacer, string) {
		var _n0 = elm$regex$Regex$fromString(userRegex);
		if (_n0.$ === 'Nothing') {
			return string;
		} else {
			var regex = _n0.a;
			return A3(elm$regex$Regex$replace, regex, replacer, string);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$compress = F2(
	function (replaceBlank, str) {
		return A3(
			jxxcarlson$meenylatex$MeenyLatex$Render2$userReplace,
			'[,;.!?&_]',
			function (_n0) {
				return '';
			},
			A3(
				elm$core$String$replace,
				' ',
				replaceBlank,
				elm$core$String$toLower(str)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$makeId = F2(
	function (prefix, name) {
		return A2(
			elm$core$String$join,
			':',
			_List_fromArray(
				[
					prefix,
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$compress, ':', name)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$idPhrase = F2(
	function (prefix, name) {
		var compressedName = A3(
			elm$core$String$replace,
			' ',
			':',
			elm$core$String$toLower(name));
		return A2(
			elm$core$String$join,
			'',
			_List_fromArray(
				[
					'id=\"_',
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$makeId, prefix, name),
					'\"'
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSection = F2(
	function (latexState, args) {
		var sectionName = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$idPhrase, 'section', sectionName);
		var label = (s1 > 0) ? (elm$core$String$fromInt(s1) + ' ') : '';
		return A2(
			elm$html$Html$h2,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					_Utils_ap(label, sectionName))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSectionStar = F2(
	function (latexState, args) {
		var sectionName = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$idPhrase, 'section', sectionName);
		return A2(
			elm$html$Html$h2,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(sectionName)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSetCounter = F2(
	function (latexState, list) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSmallSkip = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(elm$html$Html$br, _List_Nil, _List_Nil)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubSubsection = F2(
	function (latexState, args) {
		var sectionName = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var s3 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's3', latexState);
		var s2 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's2', latexState);
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$idPhrase, 'subsubsection', sectionName);
		var label = (s1 > 0) ? (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(s2) + ('.' + (elm$core$String$fromInt(s3) + ' '))))) : '';
		return A2(
			elm$html$Html$h4,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					_Utils_ap(label, sectionName))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubSubsectionStar = F2(
	function (latexState, args) {
		var sectionName = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$idPhrase, 'subsubsection', sectionName);
		return A2(
			elm$html$Html$h4,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(sectionName)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubheading = F2(
	function (latexState, args) {
		var title = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('subheading')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubsection = F2(
	function (latexState, args) {
		var sectionName = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var s2 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's2', latexState);
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$idPhrase, 'subsection', sectionName);
		var label = (s1 > 0) ? (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(s2) + ' '))) : '';
		return A2(
			elm$html$Html$h3,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					_Utils_ap(label, sectionName))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubsectionStar = F2(
	function (latexState, args) {
		var sectionName = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$idPhrase, 'subsection', sectionName);
		return A2(
			elm$html$Html$h3,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(sectionName)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$sectionPrefix = function (level) {
	switch (level) {
		case 1:
			return 'section';
		case 2:
			return 'subsection';
		case 3:
			return 'subsubsection';
		default:
			return 'asection';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$makeTocItem = function (tocItem) {
	var ti = tocItem.b;
	var id = A2(
		jxxcarlson$meenylatex$MeenyLatex$Render2$makeId,
		jxxcarlson$meenylatex$MeenyLatex$Render2$sectionPrefix(ti.level),
		ti.name);
	var i = tocItem.a;
	var href = 'href=\"#_' + (id + '\"');
	var classProperty = 'class=\"sectionLevel' + (elm$core$String$fromInt(ti.level) + '\"');
	return A2(
		elm$html$Html$li,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$href(href)
					]),
				_List_fromArray(
					[
						elm$html$Html$text(ti.name)
					]))
			]));
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$makeTableOfContents = function (latexState) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (tocItem, acc) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Render2$makeTocItem(tocItem)
						]));
			}),
		_List_Nil,
		A2(elm$core$List$indexedMap, elm$core$Tuple$pair, latexState.tableOfContents));
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderTableOfContents = F2(
	function (latexState, list) {
		var innerPart = jxxcarlson$meenylatex$MeenyLatex$Render2$makeTableOfContents(latexState);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$h3,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Table of Contents')
						])),
					A2(elm$html$Html$ul, _List_Nil, innerPart)
				]));
	});
var elm$html$Html$table = _VirtualDom_node('table');
var elm$html$Html$tbody = _VirtualDom_node('tbody');
var elm$html$Html$tr = _VirtualDom_node('tr');
var elm$html$Html$td = _VirtualDom_node('td');
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderCell = function (cell) {
	switch (cell.$) {
		case 'LXString':
			var s = cell.a;
			return A2(
				elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(s)
					]));
		case 'InlineMath':
			var s = cell.a;
			return A2(
				elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						jxxcarlson$meenylatex$MeenyLatex$Render2$inlineMathText(s)
					]));
		default:
			return A2(elm$html$Html$td, _List_Nil, _List_Nil);
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderRow = function (row) {
	if (row.$ === 'LatexList') {
		var row_ = row.a;
		return A2(
			elm$html$Html$tr,
			_List_Nil,
			A2(elm$core$List$map, jxxcarlson$meenylatex$MeenyLatex$Render2$renderCell, row_));
	} else {
		return A2(elm$html$Html$tr, _List_Nil, _List_Nil);
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderTableBody = function (body) {
	if (body.$ === 'LatexList') {
		var body_ = body.a;
		return A2(
			elm$html$Html$tbody,
			_List_Nil,
			A2(elm$core$List$map, jxxcarlson$meenylatex$MeenyLatex$Render2$renderRow, body_));
	} else {
		return A2(elm$html$Html$tbody, _List_Nil, _List_Nil);
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderTabular = F2(
	function (latexState, body) {
		return A2(
			elm$html$Html$table,
			_List_Nil,
			_List_fromArray(
				[
					jxxcarlson$meenylatex$MeenyLatex$Render2$renderTableBody(body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderTerm = F2(
	function (latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$i,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderTitle = F2(
	function (latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderUseForWeb = F2(
	function (latexState, body) {
		return jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText(
			A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderVerbatim = F2(
	function (latexState, body) {
		var body2 = A3(
			elm$core$String$replace,
			'<',
			'&lt;',
			A3(
				elm$core$String$replace,
				'>',
				'&gt;',
				A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body)));
		return A2(
			elm$html$Html$pre,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('verbatim')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(body2)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderVerse = F2(
	function (latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('verse')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					elm$core$String$trim(
						A2(jxxcarlson$meenylatex$MeenyLatex$Render$render, latexState, body)))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Configuration$client = 'http://www.knode.io';
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderXLink = F2(
	function (latexState, args) {
		var label = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, latexState, args);
		var id = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var ref = jxxcarlson$meenylatex$MeenyLatex$Configuration$client + ('##document/' + id);
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderXLinkPublic = F2(
	function (latexState, args) {
		var label = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 1, latexState, args);
		var id = A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderArg, 0, latexState, args);
		var ref = jxxcarlson$meenylatex$MeenyLatex$Configuration$client + ('##public/' + id);
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var elm$core$String$toUpper = _String_toUpper;
var jxxcarlson$meenylatex$MeenyLatex$Utility$capitalize = function (str) {
	return _Utils_ap(
		elm$core$String$toUpper(
			A2(elm$core$String$left, 1, str)),
		A2(elm$core$String$dropLeft, 1, str));
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$environmentRenderer = function (name) {
	var _n3 = A2(
		elm$core$Dict$get,
		name,
		jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderEnvironmentDict());
	if (_n3.$ === 'Just') {
		var f = _n3.a;
		return f;
	} else {
		return jxxcarlson$meenylatex$MeenyLatex$Render2$renderDefaultEnvironment(name);
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$macroRenderer = F4(
	function (name, latexState, optArgs, args) {
		var _n2 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderMacroDict());
		if (_n2.$ === 'Just') {
			var f = _n2.a;
			return A3(f, latexState, optArgs, args);
		} else {
			return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$reproduceMacro, name, latexState, optArgs, args);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$render = F2(
	function (latexState, latexExpression) {
		switch (latexExpression.$) {
			case 'Comment':
				var str = latexExpression.a;
				return A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('((' + (str + '))'))
						]));
			case 'Macro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacro, latexState, name, optArgs, args);
			case 'SMacro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				var le = latexExpression.d;
				return A5(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSMacro, latexState, name, optArgs, args, le);
			case 'Item':
				var level = latexExpression.a;
				var latexExpr = latexExpression.b;
				return A3(jxxcarlson$meenylatex$MeenyLatex$Render2$renderItem, latexState, level, latexExpr);
			case 'InlineMath':
				var str = latexExpression.a;
				return A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Render2$oneSpace,
							jxxcarlson$meenylatex$MeenyLatex$Render2$inlineMathText(str)
						]));
			case 'DisplayMath':
				var str = latexExpression.a;
				return jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText(str);
			case 'Environment':
				var name = latexExpression.a;
				var args = latexExpression.b;
				var body = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnvironment, latexState, name, args, body);
			case 'LatexList':
				var latexList = latexExpression.a;
				return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderLatexList, latexState, latexList);
			case 'LXString':
				var str = latexExpression.a;
				return A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(str)
						]));
			default:
				var error = latexExpression.a;
				return A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('((ERROR))')
						]));
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderArg = F3(
	function (k, latexState, args) {
		return A2(
			jxxcarlson$meenylatex$MeenyLatex$Render2$render,
			latexState,
			A2(jxxcarlson$meenylatex$MeenyLatex$Render2$getElement, k, args));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderArgList = F2(
	function (latexState, args) {
		return A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$Render2$render(latexState),
			args);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderBozo = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('\\bozo'),
					jxxcarlson$meenylatex$MeenyLatex$Render2$enclose(
					A3(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArg, 0, latexState, args)),
					jxxcarlson$meenylatex$MeenyLatex$Render2$enclose(
					A3(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArg, 1, latexState, args))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderCenterEnvironment = F2(
	function (latexState, body) {
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('center')
				]),
			_List_fromArray(
				[r]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderCode = F2(
	function (latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$code,
			_List_Nil,
			_List_fromArray(
				[jxxcarlson$meenylatex$MeenyLatex$Render2$oneSpace, arg]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderDefaultEnvironment = F4(
	function (name, latexState, args, body) {
		return A2(
			elm$core$List$member,
			name,
			_List_fromArray(
				['theorem', 'proposition', 'corollary', 'lemma', 'definition'])) ? A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTheoremLikeEnvironment, latexState, name, args, body) : A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderDefaultEnvironment2, latexState, name, args, body);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderDefaultEnvironment2 = F4(
	function (latexState, name, args, body) {
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('environment')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(name)
						])),
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[r]))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnumerate = F2(
	function (latexState, body) {
		return A2(
			elm$html$Html$ol,
			_List_Nil,
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnvironment = F4(
	function (latexState, name, args, body) {
		return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$environmentRenderer, name, latexState, args, body);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderIndentEnvironment = F2(
	function (latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-left', '2em')
				]),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderItalic = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$i,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(' '),
					A3(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArg, 0, latexState, args)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderItem = F3(
	function (latexState, level, latexExpression) {
		return A2(
			elm$html$Html$li,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class(
					jxxcarlson$meenylatex$MeenyLatex$Render2$itemClass(level))
				]),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, latexExpression)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderItemize = F2(
	function (latexState, body) {
		return A2(
			elm$html$Html$ul,
			_List_Nil,
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderLatexList = F2(
	function (latexState, latexList) {
		return function (list) {
			return A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'margin-bottom', '10px')
					]),
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$MeenyLatex$Render2$render(latexState),
					list));
		}(
			A2(jxxcarlson$meenylatex$MeenyLatex$ListMachine$runMachine, jxxcarlson$meenylatex$MeenyLatex$Render2$addSpace, latexList));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacro = F4(
	function (latexState, name, optArgs, args) {
		return A3(
			jxxcarlson$meenylatex$MeenyLatex$Render2$macroRenderer(name),
			latexState,
			optArgs,
			args);
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderQuotation = F2(
	function (latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('quotation')
				]),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderSMacro = F5(
	function (latexState, name, optArgs, args, le) {
		var _n0 = A2(elm$core$Dict$get, name, jxxcarlson$meenylatex$MeenyLatex$Render2$renderSMacroDict);
		if (_n0.$ === 'Just') {
			var f = _n0.a;
			return A4(f, latexState, optArgs, args, le);
		} else {
			return A5(jxxcarlson$meenylatex$MeenyLatex$Render2$reproduceSMacro, name, latexState, optArgs, args, le);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderStrong = F2(
	function (latexState, args) {
		return A2(
			elm$html$Html$strong,
			_List_Nil,
			_List_fromArray(
				[
					jxxcarlson$meenylatex$MeenyLatex$Render2$oneSpace,
					A3(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArg, 0, latexState, args)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderTheBibliography = F2(
	function (latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderTheoremLikeEnvironment = F4(
	function (latexState, name, args, body) {
		var tno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'tno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 's1', latexState);
		var tnoString = (s1 > 0) ? (' ' + (elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(tno)))) : (' ' + elm$core$String$fromInt(tno));
		var r = A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter, 'eqno', latexState);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('environment')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							_Utils_ap(
								jxxcarlson$meenylatex$MeenyLatex$Utility$capitalize(name),
								tnoString))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[r]))
				]));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$reproduceMacro = F4(
	function (name, latexState, optArgs, args) {
		var renderedArgs = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$Render2$enclose,
			A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArgList, latexState, args));
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$text('\\' + name)
					]),
				renderedArgs));
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$reproduceSMacro = F5(
	function (name, latexState, optArgs, args, le) {
		var renderedOptArgs = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$Render2$enclose,
			A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArgList, latexState, optArgs));
		var renderedLe = jxxcarlson$meenylatex$MeenyLatex$Render2$enclose(
			A2(jxxcarlson$meenylatex$MeenyLatex$Render2$render, latexState, le));
		var renderedArgs = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$Render2$enclose,
			A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderArgList, latexState, args));
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$text('\\' + name)
					]),
				_Utils_ap(
					renderedOptArgs,
					_Utils_ap(
						renderedArgs,
						_List_fromArray(
							[renderedLe])))));
	});
function jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderMacroDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'bigskip',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderBigSkip, x, z);
					})),
				_Utils_Tuple2(
				'medskip',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderMedSkip, x, z);
					})),
				_Utils_Tuple2(
				'smallskip',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSmallSkip, x, z);
					})),
				_Utils_Tuple2(
				'bozo',
				jxxcarlson$meenylatex$MeenyLatex$Render2$boost(jxxcarlson$meenylatex$MeenyLatex$Render2$renderBozo)),
				_Utils_Tuple2(
				'cite',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderCite, x, z);
					})),
				_Utils_Tuple2(
				'code',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderCode, x, z);
					})),
				_Utils_Tuple2(
				'ellie',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEllie, x, z);
					})),
				_Utils_Tuple2(
				'emph',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderItalic, x, z);
					})),
				_Utils_Tuple2(
				'eqref',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEqRef, x, z);
					})),
				_Utils_Tuple2(
				'href',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderHRef, x, z);
					})),
				_Utils_Tuple2(
				'image',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderImage, x, z);
					})),
				_Utils_Tuple2(
				'imageref',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderImageRef, x, z);
					})),
				_Utils_Tuple2(
				'index',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderIndex, x, z);
					})),
				_Utils_Tuple2(
				'italic',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderItalic, x, z);
					})),
				_Utils_Tuple2(
				'label',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderLabel, x, z);
					})),
				_Utils_Tuple2(
				'maketitle',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTitle, x, z);
					})),
				_Utils_Tuple2(
				'mdash',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderMdash, x, z);
					})),
				_Utils_Tuple2(
				'ndash',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderNdash, x, z);
					})),
				_Utils_Tuple2(
				'newcommand',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderNewCommand, x, z);
					})),
				_Utils_Tuple2(
				'ref',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderRef, x, z);
					})),
				_Utils_Tuple2(
				'medskip',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderMedSkip, x, z);
					})),
				_Utils_Tuple2(
				'smallskip',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSmallSkip, x, z);
					})),
				_Utils_Tuple2(
				'section',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSection, x, z);
					})),
				_Utils_Tuple2(
				'section*',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSectionStar, x, z);
					})),
				_Utils_Tuple2(
				'subsection',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubsection, x, z);
					})),
				_Utils_Tuple2(
				'subsection*',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubsectionStar, x, z);
					})),
				_Utils_Tuple2(
				'subsubsection',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubSubsection, x, z);
					})),
				_Utils_Tuple2(
				'subsubsection*',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubSubsectionStar, x, z);
					})),
				_Utils_Tuple2(
				'setcounter',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSetCounter, x, z);
					})),
				_Utils_Tuple2(
				'subheading',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSubheading, x, z);
					})),
				_Utils_Tuple2(
				'tableofcontents',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTableOfContents, x, z);
					})),
				_Utils_Tuple2(
				'term',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTerm, x, z);
					})),
				_Utils_Tuple2(
				'xlink',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderXLink, x, z);
					})),
				_Utils_Tuple2(
				'xlinkPublic',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderXLinkPublic, x, z);
					})),
				_Utils_Tuple2(
				'documentTitle',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderDocumentTitle, x, z);
					})),
				_Utils_Tuple2(
				'title',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTitle, x, z);
					})),
				_Utils_Tuple2(
				'author',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderAuthor, x, z);
					})),
				_Utils_Tuple2(
				'date',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderDate, x, z);
					})),
				_Utils_Tuple2(
				'revision',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderRevision, x, z);
					})),
				_Utils_Tuple2(
				'email',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEmail, x, z);
					})),
				_Utils_Tuple2(
				'strong',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderStrong, x, z);
					}))
			]));
}
function jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderEnvironmentDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'align',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderAlignEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'center',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderCenterEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'comment',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderCommentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'enumerate',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnumerate, x, y);
					})),
				_Utils_Tuple2(
				'eqnarray',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEqnArray, x, y);
					})),
				_Utils_Tuple2(
				'equation',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEquationEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'indent',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderIndentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'itemize',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderItemize, x, y);
					})),
				_Utils_Tuple2(
				'listing',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderListing, x, y);
					})),
				_Utils_Tuple2(
				'macros',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacros, x, y);
					})),
				_Utils_Tuple2(
				'maskforweb',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderCommentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'quotation',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderQuotation, x, y);
					})),
				_Utils_Tuple2(
				'tabular',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTabular, x, y);
					})),
				_Utils_Tuple2(
				'thebibliography',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTheBibliography, x, y);
					})),
				_Utils_Tuple2(
				'useforweb',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderUseForWeb, x, y);
					})),
				_Utils_Tuple2(
				'verbatim',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderVerbatim, x, y);
					})),
				_Utils_Tuple2(
				'verse',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderVerse, x, y);
					}))
			]));
}
try {
	var jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacroDict = jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderMacroDict();
	jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderMacroDict = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacroDict;
	};
	var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnvironmentDict = jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderEnvironmentDict();
	jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderEnvironmentDict = function () {
		return jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnvironmentDict;
	};
} catch ($) {
throw 'Some top-level definitions from `MeenyLatex.Render2` are causing infinite recursion:\n\n  ┌─────┐\n  │    environmentRenderer\n  │     ↓\n  │    macroRenderer\n  │     ↓\n  │    render\n  │     ↓\n  │    renderArg\n  │     ↓\n  │    renderArgList\n  │     ↓\n  │    renderMacroDict\n  │     ↓\n  │    renderBozo\n  │     ↓\n  │    renderCenterEnvironment\n  │     ↓\n  │    renderCode\n  │     ↓\n  │    renderDefaultEnvironment\n  │     ↓\n  │    renderDefaultEnvironment2\n  │     ↓\n  │    renderEnumerate\n  │     ↓\n  │    renderEnvironment\n  │     ↓\n  │    renderEnvironmentDict\n  │     ↓\n  │    renderIndentEnvironment\n  │     ↓\n  │    renderItalic\n  │     ↓\n  │    renderItem\n  │     ↓\n  │    renderItemize\n  │     ↓\n  │    renderLatexList\n  │     ↓\n  │    renderMacro\n  │     ↓\n  │    renderQuotation\n  │     ↓\n  │    renderSMacro\n  │     ↓\n  │    renderStrong\n  │     ↓\n  │    renderTheBibliography\n  │     ↓\n  │    renderTheoremLikeEnvironment\n  │     ↓\n  │    reproduceMacro\n  │     ↓\n  │    reproduceSMacro\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderString = F2(
	function (latexState, str) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			A2(
				elm$core$List$map,
				jxxcarlson$meenylatex$MeenyLatex$Render2$render(latexState),
				jxxcarlson$meenylatex$MeenyLatex$Parser$parse(str)));
	});
var jxxcarlson$meenylatex$MeenyLatex$Driver$setup = F2(
	function (seed, text) {
		return A5(jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$update, seed, jxxcarlson$meenylatex$MeenyLatex$Render2$renderLatexList, jxxcarlson$meenylatex$MeenyLatex$Render2$renderString, jxxcarlson$meenylatex$MeenyLatex$Differ$emptyEditRecordHtmlMsg, text);
	});
var mdgriffith$stylish_elephants$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var mdgriffith$stylish_elephants$Element$fill = mdgriffith$stylish_elephants$Internal$Model$Fill(1);
var mdgriffith$stylish_elephants$Internal$Model$AsColumn = {$: 'AsColumn'};
var mdgriffith$stylish_elephants$Internal$Model$asColumn = mdgriffith$stylish_elephants$Internal$Model$AsColumn;
var mdgriffith$stylish_elephants$Element$column = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asColumn,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentTop),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentLeft),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Internal$Flag$spacing = mdgriffith$stylish_elephants$Internal$Flag$flag(3);
var mdgriffith$stylish_elephants$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$spacing = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$spacing,
		A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, x));
};
var mdgriffith$stylish_elephants$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var mdgriffith$stylish_elephants$Internal$Model$asParagraph = mdgriffith$stylish_elephants$Internal$Model$AsParagraph;
var mdgriffith$stylish_elephants$Element$paragraph = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asParagraph,
			elm$core$Maybe$Just('p'),
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$spacing(5),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var author$project$Document$viewMiniLatex = F2(
	function (texMacros, document) {
		var editRecord = A2(
			jxxcarlson$meenylatex$MeenyLatex$Driver$setup,
			0,
			A2(author$project$Document$prependMacros, texMacros, document.content));
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_Nil,
			A2(
				elm$core$List$map,
				function (x) {
					return A2(
						mdgriffith$stylish_elephants$Element$paragraph,
						_List_Nil,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$html(x)
							]));
				},
				A2(jxxcarlson$meenylatex$MeenyLatex$Driver$getRenderedText, texMacros, editRecord)));
	});
var author$project$Document$viewPlainText = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		mdgriffith$stylish_elephants$Element$html(
			author$project$MarkdownTools$view(document.content)));
};
var author$project$Document$documentContentView = F2(
	function (texMacros, document) {
		var _n0 = document.textType;
		switch (_n0.$) {
			case 'MiniLatex':
				return A2(author$project$Document$viewMiniLatex, texMacros, document);
			case 'Markdown':
				return author$project$Document$viewMarkdown(document);
			case 'Asciidoc':
				return author$project$Document$viewAsciidoc(document);
			case 'AsciidocLatex':
				return author$project$Document$viewAsciidocLatex(document);
			default:
				return author$project$Document$viewPlainText(document);
		}
	});
var author$project$Document$viewDocument = F2(
	function (texMacros, doc) {
		return {
			content: A2(author$project$Document$documentContentView, texMacros, doc),
			title: doc.title
		};
	});
var mdgriffith$stylish_elephants$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var mdgriffith$stylish_elephants$Element$px = mdgriffith$stylish_elephants$Internal$Model$Px;
var mdgriffith$stylish_elephants$Internal$Flag$overflow = mdgriffith$stylish_elephants$Internal$Flag$flag(20);
var mdgriffith$stylish_elephants$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$scrollbarY = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.scrollbarsY);
var mdgriffith$stylish_elephants$Element$Keyed$el = F2(
	function (attrs, child) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Keyed(
				_List_fromArray(
					[child])));
	});
var author$project$DocumentView$contentView = F2(
	function (counter, viewDoc) {
		return A2(
			mdgriffith$stylish_elephants$Element$Keyed$el,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(
					mdgriffith$stylish_elephants$Element$px(600)),
					mdgriffith$stylish_elephants$Element$height(
					mdgriffith$stylish_elephants$Element$px(570)),
					mdgriffith$stylish_elephants$Element$scrollbarY
				]),
			_Utils_Tuple2(
				elm$core$String$fromInt(counter),
				viewDoc.content));
	});
var author$project$DocumentView$LoadMasterWithCurrentSelection = function (a) {
	return {$: 'LoadMasterWithCurrentSelection', a: a};
};
var mdgriffith$stylish_elephants$Element$rgb = F3(
	function (r, g, b) {
		return A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, r, g, b, 1);
	});
var author$project$Widget$blue = A3(mdgriffith$stylish_elephants$Element$rgb, 0.0, 0.0, 1.0);
var mdgriffith$stylish_elephants$Element$clipX = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.clipX);
var mdgriffith$stylish_elephants$Internal$Flag$active = mdgriffith$stylish_elephants$Internal$Flag$flag(32);
var mdgriffith$stylish_elephants$Internal$Model$tag = F2(
	function (label, style) {
		switch (style.$) {
			case 'Single':
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(mdgriffith$stylish_elephants$Internal$Model$Single, label + ('-' + _class), prop, val);
			case 'Colored':
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(mdgriffith$stylish_elephants$Internal$Model$Colored, label + ('-' + _class), prop, val);
			case 'Style':
				var _class = style.a;
				var props = style.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Style, label + ('-' + _class), props);
			case 'Transparency':
				var _class = style.a;
				var o = style.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, label + ('-' + _class), o);
			default:
				var x = style;
				return x;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$onlyStyles = function (attr) {
	switch (attr.$) {
		case 'StyleClass':
			var style = attr.b;
			return elm$core$Maybe$Just(style);
		case 'TextShadow':
			var shadow = attr.a;
			var stringName = mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow);
			return elm$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$Shadows,
					'txt-shadow-' + mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow),
					stringName));
		case 'BoxShadow':
			var shadow = attr.a;
			var stringName = mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow);
			return elm$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$Shadows,
					'box-shadow-' + mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow),
					stringName));
		default:
			return elm$core$Maybe$Nothing;
	}
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var mdgriffith$stylish_elephants$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AlignY = function (a) {
	return {$: 'AlignY', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$BoxShadow = function (a) {
	return {$: 'BoxShadow', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Describe = function (a) {
	return {$: 'Describe', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 'Nearby', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$NoAttribute = {$: 'NoAttribute'};
var mdgriffith$stylish_elephants$Internal$Model$TextShadow = function (a) {
	return {$: 'TextShadow', a: a};
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var mdgriffith$stylish_elephants$Internal$Model$Empty = {$: 'Empty'};
var mdgriffith$stylish_elephants$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 'Styled':
				var styled = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Styled(
					{
						html: F2(
							function (add, context) {
								return A2(
									elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.html, add, context));
							}),
						styles: styled.styles
					});
			case 'Unstyled':
				var html = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A2(
						elm$core$Basics$composeL,
						elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 'Text':
				var str = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Text(str);
			default:
				return mdgriffith$stylish_elephants$Internal$Model$Empty;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 'NoAttribute':
				return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
			case 'Describe':
				var description = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Describe(description);
			case 'AlignX':
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$AlignX(x);
			case 'AlignY':
				var y = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$AlignY(y);
			case 'Width':
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Width(x);
			case 'Height':
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Height(x);
			case 'Class':
				var x = attr.a;
				var y = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Class, x, y);
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$StyleClass, flag, style);
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				return A2(
					mdgriffith$stylish_elephants$Internal$Model$Nearby,
					location,
					A2(mdgriffith$stylish_elephants$Internal$Model$map, fn, elem));
			case 'Attr':
				var htmlAttr = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Attr(
					A2(elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			case 'TextShadow':
				var shadow = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$TextShadow(shadow);
			default:
				var shadow = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$BoxShadow(shadow);
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$removeNever = function (style) {
	return A2(mdgriffith$stylish_elephants$Internal$Model$mapAttrFromStyle, elm$core$Basics$never, style);
};
var mdgriffith$stylish_elephants$Internal$Model$unwrapDecorations = function (attrs) {
	var joinShadows = F2(
		function (x, styles) {
			if (x.$ === 'Shadows') {
				var name = x.a;
				var shadowProps = x.b;
				var _n3 = styles.shadows;
				if (_n3.$ === 'Nothing') {
					return _Utils_update(
						styles,
						{
							shadows: elm$core$Maybe$Just(
								_Utils_Tuple2(name, shadowProps))
						});
				} else {
					var _n4 = _n3.a;
					var existingName = _n4.a;
					var existingShadow = _n4.b;
					return _Utils_update(
						styles,
						{
							shadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									_Utils_ap(existingName, name),
									existingShadow + (', ' + shadowProps)))
						});
				}
			} else {
				return _Utils_update(
					styles,
					{
						styles: A2(elm$core$List$cons, x, styles.styles)
					});
			}
		});
	var addShadow = function (styles) {
		var _n0 = styles.shadows;
		if (_n0.$ === 'Nothing') {
			return styles.styles;
		} else {
			var _n1 = _n0.a;
			var shadowName = _n1.a;
			var shadowProps = _n1.b;
			return A2(
				elm$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, shadowName, shadowProps),
				styles.styles);
		}
	};
	return addShadow(
		A3(
			elm$core$List$foldr,
			joinShadows,
			{shadows: elm$core$Maybe$Nothing, styles: _List_Nil},
			A2(
				elm$core$List$filterMap,
				A2(elm$core$Basics$composeL, mdgriffith$stylish_elephants$Internal$Model$onlyStyles, mdgriffith$stylish_elephants$Internal$Model$removeNever),
				attrs)));
};
var mdgriffith$stylish_elephants$Element$mouseDown = function (decs) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$active,
		A2(
			mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
			mdgriffith$stylish_elephants$Internal$Model$Active,
			A2(
				elm$core$List$map,
				mdgriffith$stylish_elephants$Internal$Model$tag(mdgriffith$stylish_elephants$Internal$Style$classes.active),
				mdgriffith$stylish_elephants$Internal$Model$unwrapDecorations(decs))));
};
var mdgriffith$stylish_elephants$Internal$Flag$padding = mdgriffith$stylish_elephants$Internal$Flag$flag(2);
var mdgriffith$stylish_elephants$Element$paddingXY = F2(
	function (x, y) {
		return A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$padding,
			A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, y, x, y, x));
	});
var mdgriffith$stylish_elephants$Internal$Flag$fontColor = mdgriffith$stylish_elephants$Internal$Flag$flag(14);
var mdgriffith$stylish_elephants$Element$Font$color = function (fontColor) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'fc-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var mdgriffith$stylish_elephants$Internal$Flag$fontSize = mdgriffith$stylish_elephants$Internal$Flag$flag(4);
var mdgriffith$stylish_elephants$Element$Font$size = function (i) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontSize,
		mdgriffith$stylish_elephants$Internal$Model$FontSize(i));
};
var author$project$Widget$titleStyle = _List_fromArray(
	[
		mdgriffith$stylish_elephants$Element$Font$size(13),
		mdgriffith$stylish_elephants$Element$mouseDown(
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$size(13)
			])),
		mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$blue),
		A2(mdgriffith$stylish_elephants$Element$paddingXY, 10, 0),
		mdgriffith$stylish_elephants$Element$clipX
	]);
var mdgriffith$stylish_elephants$Internal$Flag$moveY = mdgriffith$stylish_elephants$Internal$Flag$flag(26);
var mdgriffith$stylish_elephants$Internal$Model$Move = F3(
	function (a, b, c) {
		return {$: 'Move', a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Element$moveUp = function (y) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$moveY,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Just(-y),
				elm$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Element$padding = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$padding,
		A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, x, x, x, x));
};
var mdgriffith$stylish_elephants$Element$text = function (content) {
	return mdgriffith$stylish_elephants$Internal$Model$Text(content);
};
var mdgriffith$stylish_elephants$Internal$Flag$fontWeight = mdgriffith$stylish_elephants$Internal$Flag$flag(13);
var mdgriffith$stylish_elephants$Element$Font$bold = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.bold);
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		elm$core$String$fromInt(n));
};
var mdgriffith$stylish_elephants$Internal$Flag$cursor = mdgriffith$stylish_elephants$Internal$Flag$flag(21);
var mdgriffith$stylish_elephants$Element$pointer = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$cursor, mdgriffith$stylish_elephants$Internal$Style$classes.cursorPointer);
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var mdgriffith$stylish_elephants$Element$Events$onClick = A2(elm$core$Basics$composeL, mdgriffith$stylish_elephants$Internal$Model$Attr, elm$html$Html$Events$onClick);
var mdgriffith$stylish_elephants$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 'StyleClass') && (attr.b.$ === 'PseudoSelector')) && (attr.b.a.$ === 'Focus')) {
		var _n1 = attr.b;
		var _n2 = _n1.a;
		return true;
	} else {
		return false;
	}
};
var mdgriffith$stylish_elephants$Element$Input$focusDefault = function (attrs) {
	return A2(elm$core$List$any, mdgriffith$stylish_elephants$Element$Input$hasFocusStyle, attrs) ? mdgriffith$stylish_elephants$Internal$Model$NoAttribute : mdgriffith$stylish_elephants$Internal$Model$htmlClass('focusable');
};
var mdgriffith$stylish_elephants$Element$Input$enter = 'Enter';
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var mdgriffith$stylish_elephants$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? elm$json$Json$Decode$succeed(msg) : elm$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			elm$json$Json$Decode$andThen,
			decode,
			A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string));
		return mdgriffith$stylish_elephants$Internal$Model$Attr(
			A2(
				elm$html$Html$Events$preventDefaultOn,
				'keyup',
				A2(
					elm$json$Json$Decode$map,
					function (fired) {
						return _Utils_Tuple2(fired, true);
					},
					isKey)));
	});
var mdgriffith$stylish_elephants$Element$Input$onEnter = function (msg) {
	return A2(mdgriffith$stylish_elephants$Element$Input$onKey, mdgriffith$stylish_elephants$Element$Input$enter, msg);
};
var mdgriffith$stylish_elephants$Internal$Model$Button = {$: 'Button'};
var mdgriffith$stylish_elephants$Element$Input$button = F2(
	function (attrs, _n0) {
		var onPress = _n0.onPress;
		var label = _n0.label;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterX),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.seButton),
								A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Element$pointer,
									A2(
										elm$core$List$cons,
										mdgriffith$stylish_elephants$Element$Input$focusDefault(attrs),
										A2(
											elm$core$List$cons,
											mdgriffith$stylish_elephants$Internal$Model$Describe(mdgriffith$stylish_elephants$Internal$Model$Button),
											A2(
												elm$core$List$cons,
												mdgriffith$stylish_elephants$Internal$Model$Attr(
													elm$html$Html$Attributes$tabindex(0)),
												function () {
													if (onPress.$ === 'Nothing') {
														return A2(
															elm$core$List$cons,
															mdgriffith$stylish_elephants$Internal$Model$Attr(
																elm$html$Html$Attributes$disabled(true)),
															attrs);
													} else {
														var msg = onPress.a;
														return A2(
															elm$core$List$cons,
															mdgriffith$stylish_elephants$Element$Events$onClick(msg),
															A2(
																elm$core$List$cons,
																mdgriffith$stylish_elephants$Element$Input$onEnter(msg),
																attrs));
													}
												}()))))))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$DocumentView$loadMasterDocumentButton = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$titleStyle,
			{
				label: A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$moveUp(0),
							mdgriffith$stylish_elephants$Element$padding(5),
							mdgriffith$stylish_elephants$Element$Font$size(18),
							mdgriffith$stylish_elephants$Element$Font$bold
						]),
					mdgriffith$stylish_elephants$Element$text(document.parentTitle + ' :: ')),
				onPress: elm$core$Maybe$Just(
					author$project$DocumentView$LoadMasterWithCurrentSelection(document.parentId))
			}));
};
var mdgriffith$stylish_elephants$Internal$Flag$moveX = mdgriffith$stylish_elephants$Internal$Flag$flag(25);
var mdgriffith$stylish_elephants$Element$moveLeft = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$moveX,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm$core$Maybe$Just(-x),
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Internal$Model$AsRow = {$: 'AsRow'};
var mdgriffith$stylish_elephants$Internal$Model$asRow = mdgriffith$stylish_elephants$Internal$Model$AsRow;
var mdgriffith$stylish_elephants$Element$row = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asRow,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentLeft),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var author$project$DocumentView$titleLine = function (document) {
	return (!document.parentId) ? A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$size(18),
				mdgriffith$stylish_elephants$Element$Font$bold
			]),
		mdgriffith$stylish_elephants$Element$text(document.title)) : A2(
		mdgriffith$stylish_elephants$Element$row,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$moveLeft(15)
			]),
		_List_fromArray(
			[
				author$project$DocumentView$loadMasterDocumentButton(document),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$moveLeft(13),
						mdgriffith$stylish_elephants$Element$Font$size(18),
						mdgriffith$stylish_elephants$Element$Font$bold
					]),
				mdgriffith$stylish_elephants$Element$text(document.title))
			]));
};
var author$project$DocumentView$view = F3(
	function (counter, texMacros, doc) {
		var viewDoc = A2(author$project$Document$viewDocument, texMacros, doc);
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(15)
				]),
			_List_fromArray(
				[
					author$project$DocumentView$titleLine(doc),
					A2(author$project$DocumentView$contentView, counter, viewDoc)
				]));
	});
var author$project$Main$DocViewMsg = function (a) {
	return {$: 'DocViewMsg', a: a};
};
var author$project$DocumentDictionary$get = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$get, key, dict);
	});
var author$project$Main$texMacros = function (model) {
	var _n0 = A2(author$project$DocumentDictionary$get, 'texmacros', model.documentDictionary);
	if (_n0.$ === 'Nothing') {
		return '';
	} else {
		var doc = _n0.a;
		return doc.content;
	}
};
var author$project$Widget$lightGrey = A3(mdgriffith$stylish_elephants$Element$rgb, 0.95, 0.95, 0.95);
var mdgriffith$stylish_elephants$Internal$Model$CenterX = {$: 'CenterX'};
var mdgriffith$stylish_elephants$Element$centerX = mdgriffith$stylish_elephants$Internal$Model$AlignX(mdgriffith$stylish_elephants$Internal$Model$CenterX);
var mdgriffith$stylish_elephants$Element$map = mdgriffith$stylish_elephants$Internal$Model$map;
var mdgriffith$stylish_elephants$Internal$Flag$bgColor = mdgriffith$stylish_elephants$Internal$Flag$flag(8);
var mdgriffith$stylish_elephants$Element$Background$color = function (clr) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$bgColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'bg-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var author$project$Main$bodyCenterColumn = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, 20, 20),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightGrey),
				mdgriffith$stylish_elephants$Element$centerX
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$map,
				author$project$Main$DocViewMsg,
				A3(
					author$project$DocumentView$view,
					model.counter,
					author$project$Main$texMacros(model),
					model.currentDocument))
			]));
};
var author$project$DocumentList$documents = function (_n0) {
	var documentList = _n0.a;
	return documentList.documents;
};
var author$project$DocumentList$selected = function (_n0) {
	var docListRecord = _n0.a;
	return docListRecord.selected;
};
var author$project$DocumentListView$SetCurrentDocument = function (a) {
	return {$: 'SetCurrentDocument', a: a};
};
var author$project$Widget$darkRed = A3(mdgriffith$stylish_elephants$Element$rgb, 0.55, 0.0, 0.0);
var mdgriffith$stylish_elephants$Element$Font$extraBold = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.textExtraBold);
var mdgriffith$stylish_elephants$Element$Font$regular = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.textNormalWeight);
var author$project$DocumentListView$selectedElementStyle = F2(
	function (maybeSelectedDocument, document) {
		if (maybeSelectedDocument.$ === 'Nothing') {
			return _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$regular,
					mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$blue)
				]);
		} else {
			var selectedDocument = maybeSelectedDocument.a;
			return _Utils_eq(selectedDocument.id, document.id) ? _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$extraBold,
					mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$darkRed)
				]) : _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$regular,
					mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$blue)
				]);
		}
	});
var author$project$Widget$lightYellow = A3(mdgriffith$stylish_elephants$Element$rgb, 0.9, 0.9, 0.8);
var author$project$Widget$listItemStyle = function (width_) {
	return _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$Font$size(13),
			mdgriffith$stylish_elephants$Element$mouseDown(
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$size(13),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightYellow)
				])),
			mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$blue),
			mdgriffith$stylish_elephants$Element$width(width_),
			mdgriffith$stylish_elephants$Element$height(
			mdgriffith$stylish_elephants$Element$px(24)),
			A2(mdgriffith$stylish_elephants$Element$paddingXY, 10, 0),
			mdgriffith$stylish_elephants$Element$clipX
		]);
};
var author$project$DocumentListView$setCurrentDocumentButton = F2(
	function (maybeSelectedDocument, document) {
		return A2(
			mdgriffith$stylish_elephants$Element$el,
			_List_Nil,
			A2(
				mdgriffith$stylish_elephants$Element$Input$button,
				author$project$Widget$listItemStyle(
					mdgriffith$stylish_elephants$Element$px(190)),
				{
					label: A2(
						mdgriffith$stylish_elephants$Element$el,
						A2(author$project$DocumentListView$selectedElementStyle, maybeSelectedDocument, document),
						mdgriffith$stylish_elephants$Element$text(document.title)),
					onPress: elm$core$Maybe$Just(
						author$project$DocumentListView$SetCurrentDocument(document))
				}));
	});
var author$project$DocumentListView$view = function (docList) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$spacing(5),
				mdgriffith$stylish_elephants$Element$scrollbarY,
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(400))
			]),
		A2(
			elm$core$List$map,
			author$project$DocumentListView$setCurrentDocumentButton(
				author$project$DocumentList$selected(docList)),
			author$project$DocumentList$documents(docList)));
};
var author$project$Main$DocListViewMsg = function (a) {
	return {$: 'DocListViewMsg', a: a};
};
var author$project$Widget$lightBlue = A3(mdgriffith$stylish_elephants$Element$rgb, 0.85, 0.85, 0.9);
var author$project$Main$bodyLeftColumn = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(250)),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightBlue),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, 20, 20),
				mdgriffith$stylish_elephants$Element$spacing(10)
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$map,
				author$project$Main$DocListViewMsg,
				author$project$DocumentListView$view(model.documentList))
			]));
};
var mdgriffith$stylish_elephants$Element$none = mdgriffith$stylish_elephants$Internal$Model$Empty;
var author$project$Main$bodyRightColumn = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(250)),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightBlue),
				mdgriffith$stylish_elephants$Element$centerX
			]),
		_List_fromArray(
			[mdgriffith$stylish_elephants$Element$none]));
};
var author$project$Widget$white = A3(mdgriffith$stylish_elephants$Element$rgb, 1.0, 1.0, 1.0);
var author$project$Main$body = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$row,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$white),
				mdgriffith$stylish_elephants$Element$centerX
			]),
		_List_fromArray(
			[
				author$project$Main$bodyLeftColumn(model),
				author$project$Main$bodyCenterColumn(model),
				author$project$Main$bodyRightColumn(model)
			]));
};
var author$project$Widget$grey = A3(mdgriffith$stylish_elephants$Element$rgb, 0.8, 0.8, 0.8);
var author$project$Main$footer = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$row,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$grey),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(40)),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, 20, 0)
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_Nil,
				mdgriffith$stylish_elephants$Element$text(model.message))
			]));
};
var author$project$Main$AcceptDocInfo = function (a) {
	return {$: 'AcceptDocInfo', a: a};
};
var author$project$Widget$black = A3(mdgriffith$stylish_elephants$Element$rgb, 0.1, 0.1, 0.1);
var mdgriffith$stylish_elephants$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 'Label', a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$OnLeft = {$: 'OnLeft'};
var mdgriffith$stylish_elephants$Element$Input$labelLeft = mdgriffith$stylish_elephants$Element$Input$Label(mdgriffith$stylish_elephants$Internal$Model$OnLeft);
var mdgriffith$stylish_elephants$Element$Input$TextInputNode = function (a) {
	return {$: 'TextInputNode', a: a};
};
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var mdgriffith$stylish_elephants$Internal$Flag$transparency = mdgriffith$stylish_elephants$Internal$Flag$flag(0);
var mdgriffith$stylish_elephants$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			elm$core$Basics$min,
			1.0,
			A2(elm$core$Basics$max, 0.0, o)));
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$transparency,
		A2(
			mdgriffith$stylish_elephants$Internal$Model$Transparency,
			'transparency-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(transparency),
			transparency));
};
var mdgriffith$stylish_elephants$Internal$Model$InFront = {$: 'InFront'};
var mdgriffith$stylish_elephants$Element$inFront = function (element) {
	return A2(mdgriffith$stylish_elephants$Internal$Model$Nearby, mdgriffith$stylish_elephants$Internal$Model$InFront, element);
};
var mdgriffith$stylish_elephants$Element$paddingEach = function (_n0) {
	var top = _n0.top;
	var right = _n0.right;
	var bottom = _n0.bottom;
	var left = _n0.left;
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$padding,
		A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, top, right, bottom, left));
};
var mdgriffith$stylish_elephants$Element$rgba = mdgriffith$stylish_elephants$Internal$Model$Rgba;
var mdgriffith$stylish_elephants$Internal$Flag$borderColor = mdgriffith$stylish_elephants$Internal$Flag$flag(28);
var mdgriffith$stylish_elephants$Element$Border$color = function (clr) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$borderColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'border-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var mdgriffith$stylish_elephants$Element$Input$Padding = F4(
	function (a, b, c, d) {
		return {$: 'Padding', a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		var position = label.a;
		var labelAttrs = label.b;
		var labelChild = label.c;
		var labelElement = A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			labelAttrs,
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[labelChild])));
		switch (position.$) {
			case 'Above':
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 'Below':
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 'OnRight':
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 'OnLeft':
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 'InFront':
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			default:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
		}
	});
var mdgriffith$stylish_elephants$Element$Input$autofill = A2(
	elm$core$Basics$composeL,
	mdgriffith$stylish_elephants$Internal$Model$Attr,
	elm$html$Html$Attributes$attribute('autocomplete'));
var mdgriffith$stylish_elephants$Element$Input$charcoal = A3(mdgriffith$stylish_elephants$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var mdgriffith$stylish_elephants$Internal$Flag$borderRound = mdgriffith$stylish_elephants$Internal$Flag$flag(17);
var mdgriffith$stylish_elephants$Element$Border$rounded = function (radius) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$borderRound,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-radius-' + elm$core$String$fromInt(radius),
			'border-radius',
			elm$core$String$fromInt(radius) + 'px'));
};
var mdgriffith$stylish_elephants$Internal$Flag$borderWidth = mdgriffith$stylish_elephants$Internal$Flag$flag(27);
var mdgriffith$stylish_elephants$Element$Border$width = function (v) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$borderWidth,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-' + elm$core$String$fromInt(v),
			'border-width',
			elm$core$String$fromInt(v) + 'px'));
};
var mdgriffith$stylish_elephants$Element$Input$darkGrey = A3(mdgriffith$stylish_elephants$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var mdgriffith$stylish_elephants$Element$Input$defaultTextPadding = A2(mdgriffith$stylish_elephants$Element$paddingXY, 12, 12);
var mdgriffith$stylish_elephants$Element$Input$white = A3(mdgriffith$stylish_elephants$Element$rgb, 1, 1, 1);
var mdgriffith$stylish_elephants$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		mdgriffith$stylish_elephants$Element$Input$defaultTextPadding,
		mdgriffith$stylish_elephants$Element$Border$rounded(3),
		mdgriffith$stylish_elephants$Element$Border$color(mdgriffith$stylish_elephants$Element$Input$darkGrey),
		mdgriffith$stylish_elephants$Element$Background$color(mdgriffith$stylish_elephants$Element$Input$white),
		mdgriffith$stylish_elephants$Element$Border$width(1),
		mdgriffith$stylish_elephants$Element$spacing(3)
	]);
var elm$html$Html$Attributes$spellcheck = elm$html$Html$Attributes$boolProperty('spellcheck');
var mdgriffith$stylish_elephants$Element$Input$spellcheck = A2(elm$core$Basics$composeL, mdgriffith$stylish_elephants$Internal$Model$Attr, elm$html$Html$Attributes$spellcheck);
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var mdgriffith$stylish_elephants$Element$Input$value = A2(elm$core$Basics$composeL, mdgriffith$stylish_elephants$Internal$Model$Attr, elm$html$Html$Attributes$value);
var mdgriffith$stylish_elephants$Internal$Model$LivePolite = {$: 'LivePolite'};
var mdgriffith$stylish_elephants$Element$Region$announce = mdgriffith$stylish_elephants$Internal$Model$Describe(mdgriffith$stylish_elephants$Internal$Model$LivePolite);
var mdgriffith$stylish_elephants$Internal$Model$filter = function (attrs) {
	return A3(
		elm$core$List$foldr,
		F2(
			function (x, _n0) {
				var found = _n0.a;
				var has = _n0.b;
				switch (x.$) {
					case 'NoAttribute':
						return _Utils_Tuple2(found, has);
					case 'Class':
						var key = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'Attr':
						var attr = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'StyleClass':
						var style = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'Width':
						var width = x.a;
						return A2(elm$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'width', has));
					case 'Height':
						var height = x.a;
						return A2(elm$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'height', has));
					case 'Describe':
						var description = x.a;
						return A2(elm$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'described', has));
					case 'Nearby':
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'AlignX':
						return A2(elm$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-x', has));
					case 'AlignY':
						return A2(elm$core$Set$member, 'align-y', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-y', has));
					case 'BoxShadow':
						var shadow = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					default:
						var shadow = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
				}
			}),
		_Utils_Tuple2(_List_Nil, elm$core$Set$empty),
		attrs).a;
};
var mdgriffith$stylish_elephants$Internal$Model$get = F2(
	function (attrs, isAttr) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, found) {
					return isAttr(x) ? A2(elm$core$List$cons, x, found) : found;
				}),
			_List_Nil,
			mdgriffith$stylish_elephants$Internal$Model$filter(attrs));
	});
var mdgriffith$stylish_elephants$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var forNearby = function (attr) {
			if (attr.$ === 'Nearby') {
				return true;
			} else {
				return false;
			}
		};
		var behavior = function () {
			var _n25 = textOptions.onChange;
			if (_n25.$ === 'Nothing') {
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Attributes$disabled(true))
					]);
			} else {
				var checkMsg = _n25.a;
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Events$onInput(checkMsg))
					]);
			}
		}();
		var attributes = A2(
			elm$core$List$cons,
			mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
			_Utils_ap(mdgriffith$stylish_elephants$Element$Input$defaultTextBoxStyle, attrs));
		var attributesFromChild = A2(
			mdgriffith$stylish_elephants$Internal$Model$get,
			attributes,
			function (attr) {
				_n22$7:
				while (true) {
					switch (attr.$) {
						case 'Width':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _n22$7;
							}
						case 'Height':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _n22$7;
							}
						case 'AlignX':
							return true;
						case 'AlignY':
							return true;
						case 'StyleClass':
							switch (attr.b.$) {
								case 'SpacingStyle':
									var _n23 = attr.b;
									return true;
								case 'FontSize':
									return true;
								case 'FontFamily':
									var _n24 = attr.b;
									return true;
								default:
									break _n22$7;
							}
						default:
							break _n22$7;
					}
				}
				return false;
			});
		var inputPadding = A2(
			mdgriffith$stylish_elephants$Internal$Model$get,
			attributes,
			function (attr) {
				if ((attr.$ === 'StyleClass') && (attr.b.$ === 'PaddingStyle')) {
					var _n21 = attr.b;
					return true;
				} else {
					return false;
				}
			});
		var nearbys = A2(
			mdgriffith$stylish_elephants$Internal$Model$get,
			attributes,
			function (attr) {
				if (attr.$ === 'Nearby') {
					return true;
				} else {
					return false;
				}
			});
		var noNearbys = A2(
			elm$core$List$filter,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, forNearby),
			attributes);
		var _n0 = function () {
			var _n1 = textInput.type_;
			if (_n1.$ === 'TextInputNode') {
				var inputType = _n1.a;
				return _Utils_Tuple3(
					'input',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$value(textOptions.text),
								mdgriffith$stylish_elephants$Internal$Model$Attr(
								elm$html$Html$Attributes$type_(inputType)),
								mdgriffith$stylish_elephants$Element$Input$spellcheck(textInput.spellchecked),
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.inputText),
								function () {
								var _n2 = textInput.autofill;
								if (_n2.$ === 'Nothing') {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									var fill = _n2.a;
									return mdgriffith$stylish_elephants$Element$Input$autofill(fill);
								}
							}()
							]),
						noNearbys),
					_List_Nil);
			} else {
				var _n3 = A3(
					elm$core$List$foldr,
					F2(
						function (attr, found) {
							_n4$4:
							while (true) {
								switch (attr.$) {
									case 'Describe':
										return found;
									case 'Height':
										var val = attr.a;
										var _n5 = found.heightContent;
										if (_n5.$ === 'Nothing') {
											if (val.$ === 'Content') {
												return _Utils_update(
													found,
													{
														adjustedAttributes: A2(elm$core$List$cons, attr, found.adjustedAttributes),
														heightContent: elm$core$Maybe$Just(val)
													});
											} else {
												return _Utils_update(
													found,
													{
														heightContent: elm$core$Maybe$Just(val)
													});
											}
										} else {
											var i = _n5.a;
											return found;
										}
									case 'StyleClass':
										switch (attr.b.$) {
											case 'PaddingStyle':
												var _n7 = attr.b;
												var t = _n7.a;
												var r = _n7.b;
												var b = _n7.c;
												var l = _n7.d;
												var _n8 = found.maybePadding;
												if (_n8.$ === 'Nothing') {
													return _Utils_update(
														found,
														{
															adjustedAttributes: found.adjustedAttributes,
															maybePadding: elm$core$Maybe$Just(
																A4(mdgriffith$stylish_elephants$Element$Input$Padding, t, r, b, l))
														});
												} else {
													return found;
												}
											case 'SpacingStyle':
												var _n9 = attr.b;
												var x = _n9.a;
												var y = _n9.b;
												var _n10 = found.maybeSpacing;
												if (_n10.$ === 'Nothing') {
													return _Utils_update(
														found,
														{
															adjustedAttributes: A2(elm$core$List$cons, attr, found.adjustedAttributes),
															maybeSpacing: elm$core$Maybe$Just(y)
														});
												} else {
													return found;
												}
											default:
												break _n4$4;
										}
									default:
										break _n4$4;
								}
							}
							return _Utils_update(
								found,
								{
									adjustedAttributes: A2(elm$core$List$cons, attr, found.adjustedAttributes)
								});
						}),
					{adjustedAttributes: _List_Nil, heightContent: elm$core$Maybe$Nothing, maybePadding: elm$core$Maybe$Nothing, maybeSpacing: elm$core$Maybe$Nothing},
					attributes);
				var maybePadding = _n3.maybePadding;
				var heightContent = _n3.heightContent;
				var maybeSpacing = _n3.maybeSpacing;
				var adjustedAttributes = _n3.adjustedAttributes;
				var spacing = A2(elm$core$Maybe$withDefault, 5, maybeSpacing);
				return _Utils_Tuple3(
					'textarea',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$spellcheck(textInput.spellchecked),
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.inputMultiline),
								A2(
								elm$core$Maybe$withDefault,
								mdgriffith$stylish_elephants$Internal$Model$NoAttribute,
								A2(elm$core$Maybe$map, mdgriffith$stylish_elephants$Element$Input$autofill, textInput.autofill)),
								function () {
								if (maybePadding.$ === 'Nothing') {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									var _n12 = maybePadding.a;
									var t = _n12.a;
									var r = _n12.b;
									var b = _n12.c;
									var l = _n12.d;
									return mdgriffith$stylish_elephants$Element$paddingEach(
										{
											bottom: A2(elm$core$Basics$max, 0, b - ((spacing / 2) | 0)),
											left: l,
											right: r,
											top: A2(elm$core$Basics$max, 0, t - ((spacing / 2) | 0))
										});
								}
							}(),
								function () {
								if (heightContent.$ === 'Nothing') {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									if (heightContent.a.$ === 'Content') {
										var _n14 = heightContent.a;
										var newlineCount = function (x) {
											return (x < 1) ? 1 : x;
										}(
											elm$core$List$length(
												elm$core$String$lines(textOptions.text)));
										var heightValue = function (count) {
											if (maybePadding.$ === 'Nothing') {
												return 'calc(' + (elm$core$String$fromInt(count) + ('em + ' + (elm$core$String$fromInt((count - 1) * spacing) + 'px) !important')));
											} else {
												var _n16 = maybePadding.a;
												var t = _n16.a;
												var r = _n16.b;
												var b = _n16.c;
												var l = _n16.d;
												return 'calc(' + (elm$core$String$fromInt(count) + ('em + ' + (elm$core$String$fromInt((t + b) + ((count - 1) * spacing)) + 'px) !important')));
											}
										};
										return A2(
											mdgriffith$stylish_elephants$Internal$Model$StyleClass,
											mdgriffith$stylish_elephants$Internal$Flag$height,
											A3(
												mdgriffith$stylish_elephants$Internal$Model$Single,
												'textarea-height-' + elm$core$String$fromInt(newlineCount),
												'height',
												heightValue(newlineCount)));
									} else {
										var x = heightContent.a;
										return mdgriffith$stylish_elephants$Internal$Model$Height(x);
									}
								}
							}()
							]),
						adjustedAttributes),
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$unstyled(
							elm$html$Html$text(textOptions.text))
						]));
			}
		}();
		var inputNode = _n0.a;
		var inputAttrs = _n0.b;
		var inputChildren = _n0.c;
		var inputElement = A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				elm$core$List$concat(
					_List_fromArray(
						[
							nearbys,
							function () {
							var _n17 = textOptions.placeholder;
							if (_n17.$ === 'Nothing') {
								return _List_Nil;
							} else {
								var _n18 = _n17.a;
								var placeholderAttrs = _n18.a;
								var placeholderEl = _n18.b;
								return _List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$inFront(
										A2(
											mdgriffith$stylish_elephants$Element$el,
											A2(
												elm$core$List$cons,
												mdgriffith$stylish_elephants$Element$Input$defaultTextPadding,
												_Utils_ap(
													noNearbys,
													_Utils_ap(
														_List_fromArray(
															[
																mdgriffith$stylish_elephants$Element$Font$color(mdgriffith$stylish_elephants$Element$Input$charcoal),
																mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.noTextSelection + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.passPointerEvents)),
																mdgriffith$stylish_elephants$Element$Border$color(
																A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0)),
																mdgriffith$stylish_elephants$Element$Background$color(
																A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0)),
																mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
																mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
																mdgriffith$stylish_elephants$Element$alpha(
																(elm$core$String$trim(textOptions.text) !== '') ? 0 : 1)
															]),
														placeholderAttrs))),
											placeholderEl))
									]);
							}
						}()
						]))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						mdgriffith$stylish_elephants$Internal$Model$element,
						mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
						mdgriffith$stylish_elephants$Internal$Model$asEl,
						elm$core$Maybe$Just(inputNode),
						elm$core$List$concat(
							_List_fromArray(
								[
									_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Input$focusDefault(attrs)
									]),
									inputAttrs,
									behavior
								])),
						mdgriffith$stylish_elephants$Internal$Model$Unkeyed(inputChildren))
					])));
		return A3(
			mdgriffith$stylish_elephants$Element$Input$applyLabel,
			A2(
				elm$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$cursor, mdgriffith$stylish_elephants$Internal$Style$classes.cursorText),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$spacing(5),
					A2(elm$core$List$cons, mdgriffith$stylish_elephants$Element$Region$announce, attributesFromChild))),
			textOptions.label,
			inputElement);
	});
var mdgriffith$stylish_elephants$Element$Input$text = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		autofill: elm$core$Maybe$Nothing,
		spellchecked: false,
		type_: mdgriffith$stylish_elephants$Element$Input$TextInputNode('text')
	});
var author$project$Main$documentInfoInput = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$text,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(200)),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(30)),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$black)
			]),
		{
			label: A2(
				mdgriffith$stylish_elephants$Element$Input$labelLeft,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(14),
						mdgriffith$stylish_elephants$Element$Font$bold
					]),
				mdgriffith$stylish_elephants$Element$text('')),
			onChange: elm$core$Maybe$Just(
				function (str) {
					return author$project$Main$AcceptDocInfo(str);
				}),
			placeholder: elm$core$Maybe$Nothing,
			text: model.docInfo
		});
};
var author$project$Main$GetPublicDocuments = function (a) {
	return {$: 'GetPublicDocuments', a: a};
};
var author$project$Widget$mouseDownColor = A3(mdgriffith$stylish_elephants$Element$rgb, 0.7, 0.1, 0.1);
var author$project$Widget$buttonStyle = function (width_) {
	return _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$Font$size(13),
			mdgriffith$stylish_elephants$Element$mouseDown(
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$size(13),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$mouseDownColor)
				])),
			mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$blue),
			mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$white),
			mdgriffith$stylish_elephants$Element$width(width_),
			mdgriffith$stylish_elephants$Element$height(
			mdgriffith$stylish_elephants$Element$px(24)),
			A2(mdgriffith$stylish_elephants$Element$paddingXY, 10, 0),
			mdgriffith$stylish_elephants$Element$Border$rounded(8)
		]);
};
var author$project$Main$getDocumentsButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				label: mdgriffith$stylish_elephants$Element$text('Search'),
				onPress: elm$core$Maybe$Just(
					author$project$Main$GetPublicDocuments(model.docInfo))
			});
	});
var author$project$Main$header = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$row,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$grey),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(40)),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, 20, 0),
				mdgriffith$stylish_elephants$Element$spacing(10)
			]),
		_List_fromArray(
			[
				author$project$Main$documentInfoInput(model),
				A2(
				author$project$Main$getDocumentsButton,
				mdgriffith$stylish_elephants$Element$px(60),
				model)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$OnlyDynamic = function (a) {
	return {$: 'OnlyDynamic', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$StaticRootAndDynamic = function (a) {
	return {$: 'StaticRootAndDynamic', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _n4 = record.hover;
					if (_n4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _n5 = record.focus;
					if (_n5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _n6 = record.mode;
					if (_n6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _n0 = record.focus;
				if (_n0.$ === 'Nothing') {
					return mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _n0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _n1 = record.hover;
				if (_n1.$ === 'Nothing') {
					return mdgriffith$stylish_elephants$Internal$Model$AllowHover;
				} else {
					var hoverable = _n1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _n2 = record.mode;
				if (_n2.$ === 'Nothing') {
					return mdgriffith$stylish_elephants$Internal$Model$Layout;
				} else {
					var actualMode = _n2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			elm$core$List$foldr,
			combine,
			{focus: elm$core$Maybe$Nothing, hover: elm$core$Maybe$Nothing, mode: elm$core$Maybe$Nothing},
			options));
};
var mdgriffith$stylish_elephants$Internal$Model$toHtml = F2(
	function (options, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				var styleSheet = A2(
					mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString,
					options,
					A3(
						elm$core$List$foldl,
						mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
						_Utils_Tuple2(
							elm$core$Set$empty,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.focus)
								])),
						styles).b);
				return A2(
					html,
					elm$core$Maybe$Just(styleSheet),
					mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$textElement(text);
			default:
				return mdgriffith$stylish_elephants$Internal$Model$textElement('');
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = mdgriffith$stylish_elephants$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _n0 = options.mode;
			if (_n0.$ === 'NoStaticStyleSheet') {
				return mdgriffith$stylish_elephants$Internal$Model$OnlyDynamic(options);
			} else {
				return mdgriffith$stylish_elephants$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			mdgriffith$stylish_elephants$Internal$Model$toHtml,
			options,
			A5(
				mdgriffith$stylish_elephants$Internal$Model$element,
				embedStyle,
				mdgriffith$stylish_elephants$Internal$Model$asEl,
				elm$core$Maybe$Nothing,
				attributes,
				mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var mdgriffith$stylish_elephants$Internal$Flag$fontFamily = mdgriffith$stylish_elephants$Internal$Flag$flag(5);
var mdgriffith$stylish_elephants$Internal$Model$SansSerif = {$: 'SansSerif'};
var mdgriffith$stylish_elephants$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							elm$core$String$join,
							'-',
							elm$core$String$words(
								elm$core$String$toLower(name)));
					default:
						var name = font.a;
						var url = font.b;
						return A2(
							elm$core$String$join,
							'-',
							elm$core$String$words(
								elm$core$String$toLower(name)));
				}
			}());
	});
var mdgriffith$stylish_elephants$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Open Sans'),
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Helvetica'),
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Verdana'),
			mdgriffith$stylish_elephants$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$bgColor,
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'bg-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 1)),
				'background-color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 1))),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontColor,
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'font-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontSize,
			A3(mdgriffith$stylish_elephants$Internal$Model$Single, 'font-size-20', 'font-size', '20px')),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontFamily,
			A2(
				mdgriffith$stylish_elephants$Internal$Model$FontFamily,
				A3(elm$core$List$foldl, mdgriffith$stylish_elephants$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var mdgriffith$stylish_elephants$Element$layoutWith = F3(
	function (_n0, attrs, child) {
		var options = _n0.options;
		return A3(
			mdgriffith$stylish_elephants$Internal$Model$renderRoot,
			options,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.root, mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterX, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY]))),
				_Utils_ap(mdgriffith$stylish_elephants$Internal$Model$rootStyle, attrs)),
			child);
	});
var mdgriffith$stylish_elephants$Element$layout = mdgriffith$stylish_elephants$Element$layoutWith(
	{options: _List_Nil});
var author$project$Main$view = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$layout,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$size(14),
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill)
			]),
		A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill)
				]),
			_List_fromArray(
				[
					author$project$Main$header(model),
					author$project$Main$body(model),
					author$project$Main$footer(model)
				])));
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$element = _Browser_element;
var author$project$Main$main = elm$browser$Browser$element(
	{init: author$project$Main$init, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(
		{}))(0)}});}(this));