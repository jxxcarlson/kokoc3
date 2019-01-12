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




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.cf.a_ === region.cC.a_)
	{
		return 'on line ' + region.cf.a_;
	}
	return 'on lines ' + region.cf.a_ + ' through ' + region.cC.a_;
}



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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
			callback(_Http_handleResponse(xhr, request.aV.a));
		});

		try
		{
			xhr.open(request.a0, request.bf, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.bf)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.aQ;
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
			dI: event.loaded,
			dJ: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.aW; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.aV.b;
	xhr.withCredentials = request.bg;

	elm$core$Maybe$isJust(request.a8) && (xhr.timeout = request.a8.a);
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
		bf: xhr.responseURL,
		eO: { dO: xhr.status, e: xhr.statusText },
		aW: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		aQ: xhr.response
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
		impl.ea,
		impl.fc,
		impl.eU,
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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

function _VirtualDom_noJavaScriptUri(value)
{
	return /^\s*javascript:/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^\s*javascript:/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
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
		e: func(record.e),
		eP: record.eP,
		ew: record.ew
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
		var message = !tag ? value : tag < 3 ? value.a : value.e;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.eP;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.ew) && event.preventDefault(),
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



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.ea,
		impl.fc,
		impl.eU,
		function(sendToApp, initialModel) {
			var view = impl.fd;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.ea,
		impl.fc,
		impl.eU,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.cd && impl.cd(sendToApp)
			var view = impl.fd;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.aQ);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.as) && (_VirtualDom_doc.title = title = doc.as);
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
	var onUrlChange = impl.eq;
	var onUrlRequest = impl.er;
	return _Browser_document({
		cd: function(sendToApp)
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
							&& curr.ex === next.ex
							&& curr.d3 === next.d3
							&& curr.ev.a === next.ev.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		ea: function(flags)
		{
			return A3(impl.ea, flags, _Browser_getUrl(), key);
		},
		fd: impl.fd,
		fc: impl.fc,
		eU: impl.eU
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
		? { d2: 'hidden', aR: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { d2: 'mozHidden', aR: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { d2: 'msHidden', aR: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { d2: 'webkitHidden', aR: 'webkitvisibilitychange' }
		: { d2: 'hidden', aR: 'visibilitychange' };
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
		c5: {
			cj: node.scrollWidth,
			b$: node.scrollHeight
		},
		df: {
			bK: _Browser_window.pageXOffset,
			bL: _Browser_window.pageYOffset,
			cj: node.clientWidth,
			b$: node.clientHeight
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
			c5: {
				cj: node.scrollWidth,
				b$: node.scrollHeight
			},
			df: {
				bK: node.scrollLeft,
				bL: node.scrollTop,
				cj: node.clientWidth,
				b$: node.clientHeight
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
			c5: {
				cj: node.scrollWidth,
				b$: node.scrollHeight
			},
			df: {
				bK: x,
				bL: y,
				cj: node.clientWidth,
				b$: node.clientHeight
			},
			dV: {
				bK: x + rect.left,
				bL: y + rect.top,
				cj: rect.width,
				b$: rect.height
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


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.cT) { flags += 'm'; }
	if (options.cr) { flags += 'i'; }

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
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
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
var elm$core$List$cons = _List_cons;
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
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$mul = _Basics_mul;
var author$project$Configuration$autosaveDuration = 30 * 1000;
var author$project$DocumentDictionary$DocumentDictionary = elm$core$Basics$identity;
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var author$project$DocumentDictionary$empty = elm$core$Dict$empty;
var author$project$DocumentList$DocumentList = elm$core$Basics$identity;
var elm$core$Maybe$Nothing = {$: 1};
var author$project$DocumentList$empty = {J: _List_Nil, M: elm$core$Maybe$Nothing};
var author$project$DocumentList$emptyIntList = {
	aZ: _List_fromArray(
		[0]),
	M: 0
};
var author$project$Main$DeleteIsOnSafety = 0;
var author$project$Main$HideToolPanel = 1;
var author$project$Main$Reading = 0;
var author$project$Main$SigninMode = 1;
var elm$core$Basics$False = 1;
var jinjor$elm_debounce$Debounce$Debounce = elm$core$Basics$identity;
var jinjor$elm_debounce$Debounce$init = {R: _List_Nil, a$: false};
var ohanhi$keyboard$Keyboard$F20 = {$: 57};
var author$project$Main$initialModel = F4(
	function (locationHref, windowWidth, windowHeight, document) {
		return {t: 0, bR: author$project$Configuration$autosaveDuration, af: 0, a: document, z: false, aB: jinjor$elm_debounce$Debounce$init, aT: 0, D: 0, I: author$project$DocumentDictionary$empty, bq: author$project$DocumentList$emptyIntList, m: author$project$DocumentList$empty, aC: '', K: '', cP: locationHref, h: elm$core$Maybe$Nothing, ak: elm$core$Maybe$Nothing, E: elm$core$Maybe$Nothing, b4: elm$core$Maybe$Nothing, e: 'App started', ab: '', ca: _List_Nil, a6: ohanhi$keyboard$Keyboard$F20, aK: '', bD: 0, bE: 1, ce: '', bF: '', s: 1, aw: '', P: windowHeight, bJ: windowWidth};
	});
var author$project$Document$ReceiveDocument = function (a) {
	return {$: 0, a: a};
};
var author$project$Configuration$backend = 'https://nshost.herokuapp.com';
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
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
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
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
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.n) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.p),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.p);
		} else {
			var treeLen = builder.n * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.r) : builder.r;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.n);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.p) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.p);
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
					{r: nodeList, n: (len / elm$core$Array$branchFactor) | 0, p: tail});
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
	return {$: 0, a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
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
	return {dU: document};
};
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
																					return {ck: access, bO: archive, bP: authorId, dw: authorIdentifier, bQ: authorName, cu: children, az: content, cy: created, bY: docType, Z: id, bs: identifier, cO: lastViewed, aG: level, cR: modified, bz: parentId, b9: parentTitle, cb: _public, cg: tags, ch: textType, as: title, ci: version};
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
var author$project$Document$Child = F5(
	function (title, docId, docIdentifier, level, comment) {
		return {bT: comment, bW: docId, bX: docIdentifier, aG: level, as: title};
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
		'level',
		elm$json$Json$Decode$int,
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'doc_identifier',
			elm$json$Json$Decode$string,
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'doc_id',
				elm$json$Json$Decode$int,
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'title',
					elm$json$Json$Decode$string,
					elm$json$Json$Decode$succeed(author$project$Document$Child))))));
var author$project$Document$Master = 1;
var author$project$Document$Standard = 0;
var elm$core$Basics$append = _Utils_append;
var elm$json$Json$Decode$fail = _Json_fail;
var author$project$Document$decodeDocType = function (docTypeString) {
	switch (docTypeString) {
		case 'standard':
			return elm$json$Json$Decode$succeed(0);
		case 'master':
			return elm$json$Json$Decode$succeed(1);
		default:
			return elm$json$Json$Decode$fail('I don\'t know a docType named ' + docTypeString);
	}
};
var author$project$Document$Asciidoc = 2;
var author$project$Document$AsciidocLatex = 3;
var author$project$Document$Markdown = 1;
var author$project$Document$MiniLatex = 0;
var author$project$Document$decodeTextType = function (textTypeString) {
	switch (textTypeString) {
		case 'adoc':
			return elm$json$Json$Decode$succeed(2);
		case 'adoc_latex':
			return elm$json$Json$Decode$succeed(3);
		case 'plain':
			return elm$json$Json$Decode$succeed(2);
		case 'latex':
			return elm$json$Json$Decode$succeed(0);
		case 'markdown':
			return elm$json$Json$Decode$succeed(1);
		default:
			return elm$json$Json$Decode$fail('I don\'t know a textType named ' + textTypeString);
	}
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
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
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
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
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_n4.$ === -1) {
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
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_n7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
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
		return {$: 4, a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$NetworkError = {$: 2};
var elm$http$Http$Timeout = {$: 1};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 2, a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 1) {
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.aQ);
			if (_n0.$ === 1) {
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
		return {$: 0, a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Internal$Header;
var elm$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$http$Http$jsonBody = function (value) {
	return A2(
		elm$http$Http$Internal$StringBody,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
var elm$http$Http$Internal$Request = elm$core$Basics$identity;
var elm$http$Http$request = elm$core$Basics$identity;
var elm$json$Json$Encode$null = _Json_encodeNull;
var author$project$Document$getDocumentByIdRequest = F2(
	function (id, maybeTokenString) {
		var _n0 = function () {
			if (maybeTokenString.$ === 1) {
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
				aQ: elm$http$Http$jsonBody(elm$json$Json$Encode$null),
				aV: elm$http$Http$expectJson(author$project$Document$documentRecordDecoder),
				aW: headers,
				a0: 'Get',
				a8: elm$core$Maybe$Just(5000),
				bf: _Utils_ap(author$project$Configuration$backend, route),
				bg: false
			});
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
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
		var task = _n0;
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
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
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
					task)));
	});
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0;
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
var author$project$DocumentList$ReceiveDocumentList = function (a) {
	return {$: 0, a: a};
};
var author$project$DocumentList$DocumentListRecord = F2(
	function (documents, selected) {
		return {J: documents, M: selected};
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
var author$project$DocumentList$documentListDecoder = A2(elm$json$Json$Decode$map, elm$core$Basics$identity, author$project$DocumentList$documentListRecordDecoder);
var author$project$User$getTokenString = function (_n0) {
	var user = _n0;
	var _n1 = user.bH;
	var str = _n1;
	return str;
};
var author$project$DocumentList$findDocumentsRequest = F2(
	function (maybeUser, queryString) {
		var _n0 = function () {
			if (maybeUser.$ === 1) {
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
				aQ: elm$http$Http$jsonBody(elm$json$Json$Encode$null),
				aV: elm$http$Http$expectJson(author$project$DocumentList$documentListDecoder),
				aW: headers,
				a0: 'Get',
				a8: elm$core$Maybe$Just(5000),
				bf: _Utils_ap(author$project$Configuration$backend, route),
				bg: false
			});
	});
var author$project$DocumentList$findDocuments = F2(
	function (maybeUser, queryString) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$ReceiveDocumentList,
			A2(author$project$DocumentList$findDocumentsRequest, maybeUser, queryString));
	});
var author$project$Main$AskToReconnectDocument = function (a) {
	return {$: 2, a: a};
};
var author$project$Main$AskToReconnectDocumentList = function (a) {
	return {$: 3, a: a};
};
var author$project$Main$AskToReconnectUser = function (a) {
	return {$: 5, a: a};
};
var author$project$Main$DocListMsg = function (a) {
	return {$: 19, a: a};
};
var author$project$Main$DocMsg = function (a) {
	return {$: 18, a: a};
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
			_Json_emptyObject(0),
			pairs));
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Main$infoForOutside = _Platform_outgoingPort(
	'infoForOutside',
	function ($) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'data',
					elm$core$Basics$identity($.w)),
					_Utils_Tuple2(
					'tag',
					elm$json$Json$Encode$string($.G))
				]));
	});
var author$project$Main$sendInfoOutside = function (info) {
	switch (info.$) {
		case 0:
			var value = info.a;
			return author$project$Main$infoForOutside(
				{w: value, G: 'DocumentData'});
		case 1:
			var value = info.a;
			return author$project$Main$infoForOutside(
				{w: value, G: 'DocumentListData'});
		case 4:
			var value = info.a;
			return author$project$Main$infoForOutside(
				{w: value, G: 'UserData'});
		case 2:
			var value = info.a;
			return author$project$Main$infoForOutside(
				{w: elm$json$Json$Encode$null, G: 'AskToReconnectDocument'});
		case 3:
			var value = info.a;
			return author$project$Main$infoForOutside(
				{w: elm$json$Json$Encode$null, G: 'AskToReconnectDocumentList'});
		case 5:
			var value = info.a;
			return author$project$Main$infoForOutside(
				{w: elm$json$Json$Encode$null, G: 'AskToReconnectUser'});
		default:
			var value = info.a;
			return author$project$Main$infoForOutside(
				{w: elm$json$Json$Encode$null, G: 'AskToEraseLocalStorage'});
	}
};
var author$project$UrlAppParser$NotFound = {$: 0};
var author$project$UrlAppParser$DocumentIdRef = function (a) {
	return {$: 1, a: a};
};
var author$project$UrlAppParser$HomeRef = function (a) {
	return {$: 2, a: a};
};
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Parser$Parser = elm$core$Basics$identity;
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {ai: frag, ao: params, ae: unvisited, U: value, ax: visited};
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_n0) {
			var visited = _n0.ax;
			var unvisited = _n0.ae;
			var params = _n0.ao;
			var frag = _n0.ai;
			var value = _n0.U;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _n2 = stringToSomething(next);
				if (!_n2.$) {
					var nextValue = _n2.a;
					return _List_fromArray(
						[
							A5(
							elm$url$Url$Parser$State,
							A2(elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var elm$url$Url$Parser$int = A2(elm$url$Url$Parser$custom, 'NUMBER', elm$core$String$toInt);
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.ax;
		var unvisited = _n0.ae;
		var params = _n0.ao;
		var frag = _n0.ai;
		var value = _n0.U;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0;
		return function (_n1) {
			var visited = _n1.ax;
			var unvisited = _n1.ae;
			var params = _n1.ao;
			var frag = _n1.ai;
			var value = _n1.U;
			return A2(
				elm$core$List$map,
				elm$url$Url$Parser$mapState(value),
				parseArg(
					A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
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
var elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			elm$core$List$concatMap,
			function (_n0) {
				var parser = _n0;
				return parser(state);
			},
			parsers);
	};
};
var elm$url$Url$Parser$s = function (str) {
	return function (_n0) {
		var visited = _n0.ax;
		var unvisited = _n0.ae;
		var params = _n0.ao;
		var frag = _n0.ai;
		var value = _n0.U;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					elm$url$Url$Parser$State,
					A2(elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0;
		var parseAfter = _n1;
		return function (state) {
			return A2(
				elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var elm$url$Url$Parser$string = A2(elm$url$Url$Parser$custom, 'STRING', elm$core$Maybe$Just);
var author$project$UrlAppParser$route = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$url$Url$Parser$map,
			author$project$UrlAppParser$HomeRef,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('home'),
				elm$url$Url$Parser$string)),
			A2(elm$url$Url$Parser$map, author$project$UrlAppParser$DocumentIdRef, elm$url$Url$Parser$int)
		]));
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {d$: fragment, d3: host, eu: path, ev: port_, ex: protocol, ey: query};
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
					if (_n1.$ === 1) {
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
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.ae;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.U);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.U);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 1) {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 1) {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.eu),
					elm$url$Url$Parser$prepareQuery(url.ey),
					url.d$,
					elm$core$Basics$identity)));
	});
var author$project$UrlAppParser$toRoute = function (string) {
	var _n0 = elm$url$Url$fromString(string);
	if (_n0.$ === 1) {
		return author$project$UrlAppParser$NotFound;
	} else {
		var url = _n0.a;
		return A2(
			elm$core$Maybe$withDefault,
			author$project$UrlAppParser$NotFound,
			A2(elm$url$Url$Parser$parse, author$project$UrlAppParser$route, url));
	}
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Main$processUrl = function (urlString) {
	var _n0 = author$project$UrlAppParser$toRoute(urlString);
	switch (_n0.$) {
		case 0:
			return elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Main$sendInfoOutside(
						author$project$Main$AskToReconnectDocument(elm$json$Json$Encode$null)),
						author$project$Main$sendInfoOutside(
						author$project$Main$AskToReconnectDocumentList(elm$json$Json$Encode$null)),
						author$project$Main$sendInfoOutside(
						author$project$Main$AskToReconnectUser(elm$json$Json$Encode$null))
					]));
		case 1:
			var docId = _n0.a;
			return elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Main$sendInfoOutside(
						author$project$Main$AskToReconnectUser(elm$json$Json$Encode$null)),
						A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocMsg,
						A2(author$project$Document$getDocumentById, docId, elm$core$Maybe$Nothing))
					]));
		default:
			var username = _n0.a;
			return elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Main$sendInfoOutside(
						author$project$Main$AskToReconnectUser(elm$json$Json$Encode$null)),
						A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocListMsg,
						A2(author$project$DocumentList$findDocuments, elm$core$Maybe$Nothing, 'key=home&authorname=' + username))
					]));
	}
};
var author$project$Configuration$basicDocumentText = '\nThis is \\strong{knode.io}, ready to run MiniLatex,\nAsciidoc, Markdown, or just plain old text.\n\n$$\\int_0^1 x^n dx = \\frac{1}{n+1}$$\n\nWrite formulas, place images, etc.\nEdit live and publish to the web in real time. Lecture notes, poetry, whatever.\nClick on \\strong{Home} to go to your home page.\n\n\n\\bigskip\n\n\\image{http://noteimages.s3.amazonaws.com/uploads/butterfly.jpg}{}{width: 450}\n\n\\bigskip\n\nClick on \\strong{Random} to explore.  To find things, type something in\nthe search box, e.g., \\italic{matt}, \\italic{wave}, or \\italic{snow},\nthen type Ctrl-ENTER or Ctrl-RETURN.\n \n\n\\bigskip\n\\strong{knode.io} is made with \\href{http://elm-lang.org/}{Elm}.\n\n\\bigskip\n\\href{https://xknode.tech}{Test link}\n\n\\href{http://localhost:8080/560}{Local test link}\n\n\\bigskip\n\n\\bigskip\n';
var author$project$Document$basicDocument = author$project$Document$Document(0)('basicDocument123')(0)('author123')('Phineas Phud')('Welcome to kNode Reader')(author$project$Configuration$basicDocumentText)(1)(true)(elm$core$Dict$empty)(
	_List_fromArray(
		['texmacros:453']))(_List_Nil)(0)('Parent')(0)(0)('default')(0)(
	elm$time$Time$millisToPosix(0))(
	elm$time$Time$millisToPosix(0))(
	elm$time$Time$millisToPosix(0));
var author$project$SystemDocument$welcome = _Utils_update(
	author$project$Document$basicDocument,
	{as: 'Welcome!'});
var author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		A4(author$project$Main$initialModel, flags.bt, flags.cj, flags.b$, author$project$SystemDocument$welcome),
		elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					author$project$Main$processUrl(flags.bt)
				])));
};
var author$project$Main$KeyMsg = function (a) {
	return {$: 41, a: a};
};
var author$project$Main$LogErr = function (a) {
	return {$: 32, a: a};
};
var author$project$Main$Outside = function (a) {
	return {$: 31, a: a};
};
var author$project$Main$UrlChanged = function (a) {
	return {$: 43, a: a};
};
var author$project$Main$SaveCurrentDocument = function (a) {
	return {$: 29, a: a};
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {c$: processes, dc: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
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
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				var list = _n0.a;
				var result = _n0.b;
				if (!list.b) {
					return _Utils_Tuple2(
						list,
						A3(rightStep, rKey, rValue, result));
				} else {
					var _n2 = list.a;
					var lKey = _n2.a;
					var lValue = _n2.b;
					var rest = list.b;
					return (_Utils_cmp(lKey, rKey) < 0) ? A3(
						stepState,
						rKey,
						rValue,
						_Utils_Tuple2(
							rest,
							A3(leftStep, lKey, lValue, result))) : ((_Utils_cmp(lKey, rKey) > 0) ? _Utils_Tuple2(
						list,
						A3(rightStep, rKey, rValue, result)) : _Utils_Tuple2(
						rest,
						A4(bothStep, lKey, lValue, rValue, result)));
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 1) {
			return A3(
				elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm$core$Dict$insert,
				interval,
				A2(elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$setInterval = _Time_setInterval;
var elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm$core$Process$spawn(
				A2(
					elm$time$Time$setInterval,
					interval,
					A2(elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm$time$Time$spawnHelp,
					router,
					rest,
					A3(elm$core$Dict$insert, interval, id, processes));
			};
			return A2(elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm$time$Time$onEffects = F3(
	function (router, subs, _n0) {
		var processes = _n0.c$;
		var rightStep = F3(
			function (_n6, id, _n7) {
				var spawns = _n7.a;
				var existing = _n7.b;
				var kills = _n7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						elm$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm$core$Process$kill(id)));
			});
		var newTaggers = A3(elm$core$List$foldl, elm$time$Time$addMySub, elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _n3) {
				var spawns = _n3.a;
				var existing = _n3.b;
				var kills = _n3.c;
				return _Utils_Tuple3(
					spawns,
					A3(elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm$core$Dict$empty,
				elm$core$Task$succeed(0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm$core$Task$andThen,
			function (newProcesses) {
				return elm$core$Task$succeed(
					A2(elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.dc);
		if (_n0.$ === 1) {
			return elm$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm$core$Task$sequence(
					A2(
						elm$core$List$map,
						function (tagger) {
							return A2(
								elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$succeed(state);
				},
				A2(elm$core$Task$andThen, tellTaggers, elm$time$Time$now));
		}
	});
var elm$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm$time$Time$Every,
			interval,
			A2(elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm$time$Time$init, elm$time$Time$onEffects, elm$time$Time$onSelfMsg, 0, elm$time$Time$subMap);
var elm$time$Time$subscription = _Platform_leaf('Time');
var elm$time$Time$every = F2(
	function (interval, tagger) {
		return elm$time$Time$subscription(
			A2(elm$time$Time$Every, interval, tagger));
	});
var author$project$Main$autosaveSubscription = function (model) {
	return model.z ? A2(elm$time$Time$every, model.bR, author$project$Main$SaveCurrentDocument) : elm$core$Platform$Sub$none;
};
var author$project$Document$decodeDocumentFromOutside = A3(
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
var author$project$DocumentList$IntList = F2(
	function (ints, selected) {
		return {aZ: ints, M: selected};
	});
var author$project$DocumentList$intListDecoder = A3(
	elm$json$Json$Decode$map2,
	author$project$DocumentList$IntList,
	A2(
		elm$json$Json$Decode$field,
		'documentIds',
		elm$json$Json$Decode$list(elm$json$Json$Decode$int)),
	A2(elm$json$Json$Decode$field, 'selected', elm$json$Json$Decode$int));
var author$project$Main$DocumentDataFromOutside = function (a) {
	return {$: 0, a: a};
};
var author$project$Main$DocumentListDataFromOutside = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$UserDataFromOutside = function (a) {
	return {$: 2, a: a};
};
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Main$infoForElm = _Platform_incomingPort(
	'infoForElm',
	A2(
		elm$json$Json$Decode$andThen,
		function (tag) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (data) {
					return elm$json$Json$Decode$succeed(
						{w: data, G: tag});
				},
				A2(elm$json$Json$Decode$field, 'data', elm$json$Json$Decode$value));
		},
		A2(elm$json$Json$Decode$field, 'tag', elm$json$Json$Decode$string)));
var author$project$User$Token = elm$core$Basics$identity;
var author$project$User$User = elm$core$Basics$identity;
var author$project$User$UserRecord = F4(
	function (email, id, token, username) {
		return {K: email, Z: id, bH: token, aw: username};
	});
var elm$json$Json$Decode$map4 = _Json_map4;
var author$project$User$decodeUserFromOutside = A2(
	elm$json$Json$Decode$map,
	elm$core$Basics$identity,
	A5(
		elm$json$Json$Decode$map4,
		author$project$User$UserRecord,
		A2(elm$json$Json$Decode$field, 'email', elm$json$Json$Decode$string),
		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
		A2(
			elm$json$Json$Decode$map,
			elm$core$Basics$identity,
			A2(elm$json$Json$Decode$field, 'token', elm$json$Json$Decode$string)),
		A2(elm$json$Json$Decode$field, 'username', elm$json$Json$Decode$string)));
var elm$json$Json$Decode$decodeValue = _Json_run;
var author$project$Main$getInfoFromOutside = F2(
	function (tagger, onError) {
		return author$project$Main$infoForElm(
			function (outsideInfo) {
				var _n0 = outsideInfo.G;
				switch (_n0) {
					case 'ReconnectDocument':
						var _n1 = A2(elm$json$Json$Decode$decodeValue, author$project$Document$decodeDocumentFromOutside, outsideInfo.w);
						if (!_n1.$) {
							var result = _n1.a;
							return tagger(
								author$project$Main$DocumentDataFromOutside(result));
						} else {
							var e = _n1.a;
							return onError('No doc to retrieve');
						}
					case 'ReconnectDocumentList':
						var _n2 = A2(elm$json$Json$Decode$decodeValue, author$project$DocumentList$intListDecoder, outsideInfo.w);
						if (!_n2.$) {
							var result = _n2.a;
							return tagger(
								author$project$Main$DocumentListDataFromOutside(result));
						} else {
							var e = _n2.a;
							return onError('No doc to retrieve');
						}
					case 'ReconnectUser':
						var _n3 = A2(elm$json$Json$Decode$decodeValue, author$project$User$decodeUserFromOutside, outsideInfo.w);
						if (!_n3.$) {
							var result = _n3.a;
							return tagger(
								author$project$Main$UserDataFromOutside(result));
						} else {
							var e = _n3.a;
							return onError(
								'Bad decode (getInfoFromOutside)' + elm$json$Json$Decode$errorToString(e));
						}
					default:
						return onError('Unexpected info from outside');
				}
			});
	});
var author$project$Main$onUrlChange = _Platform_incomingPort('onUrlChange', elm$json$Json$Decode$string);
var elm$core$Platform$Sub$map = _Platform_map;
var ohanhi$keyboard$Keyboard$Down = function (a) {
	return {$: 0, a: a};
};
var ohanhi$keyboard$Keyboard$Up = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Events$Document = 0;
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {cY: pids, da: subs};
	});
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {cD: event, cN: key};
	});
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.cY,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
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
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.cN;
		var event = _n0.cD;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.da);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onKeyDown = A2(elm$browser$Browser$Events$on, 0, 'keydown');
var ohanhi$keyboard$Keyboard$RawKey = elm$core$Basics$identity;
var ohanhi$keyboard$Keyboard$eventKeyDecoder = A2(
	elm$json$Json$Decode$field,
	'key',
	A2(elm$json$Json$Decode$map, elm$core$Basics$identity, elm$json$Json$Decode$string));
var ohanhi$keyboard$Keyboard$downs = function (toMsg) {
	return elm$browser$Browser$Events$onKeyDown(
		A2(elm$json$Json$Decode$map, toMsg, ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var elm$browser$Browser$Events$onKeyUp = A2(elm$browser$Browser$Events$on, 0, 'keyup');
var ohanhi$keyboard$Keyboard$ups = function (toMsg) {
	return elm$browser$Browser$Events$onKeyUp(
		A2(elm$json$Json$Decode$map, toMsg, ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var ohanhi$keyboard$Keyboard$subscriptions = elm$core$Platform$Sub$batch(
	_List_fromArray(
		[
			ohanhi$keyboard$Keyboard$downs(ohanhi$keyboard$Keyboard$Down),
			ohanhi$keyboard$Keyboard$ups(ohanhi$keyboard$Keyboard$Up)
		]));
var author$project$Main$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Main$autosaveSubscription(model),
				A2(author$project$Main$getInfoFromOutside, author$project$Main$Outside, author$project$Main$LogErr),
				A2(elm$core$Platform$Sub$map, author$project$Main$KeyMsg, ohanhi$keyboard$Keyboard$subscriptions),
				author$project$Main$onUrlChange(author$project$Main$UrlChanged)
			]));
};
var author$project$Configuration$userManualId = 750;
var author$project$Document$AcknowledgeUpdateOfDocument = function (a) {
	return {$: 2, a: a};
};
var author$project$Document$encodeDocType = function (docType) {
	if (!docType) {
		return elm$json$Json$Encode$string('standard');
	} else {
		return elm$json$Json$Encode$string('master');
	}
};
var author$project$Document$encodeTextType = function (textType) {
	switch (textType) {
		case 2:
			return elm$json$Json$Encode$string('adoc');
		case 3:
			return elm$json$Json$Encode$string('adoc_latex');
		case 0:
			return elm$json$Json$Encode$string('latex');
		case 4:
			return elm$json$Json$Encode$string('plain');
		default:
			return elm$json$Json$Encode$string('markdown');
	}
};
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$int = _Json_wrap;
var author$project$Document$encodeDocumentAttributes = function (doc) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'text_type',
				author$project$Document$encodeTextType(doc.ch)),
				_Utils_Tuple2(
				'public',
				elm$json$Json$Encode$bool(doc.cb)),
				_Utils_Tuple2(
				'doc_type',
				author$project$Document$encodeDocType(doc.bY)),
				_Utils_Tuple2(
				'level',
				elm$json$Json$Encode$int(doc.aG)),
				_Utils_Tuple2(
				'archive',
				elm$json$Json$Encode$string(doc.bO)),
				_Utils_Tuple2(
				'version',
				elm$json$Json$Encode$int(doc.ci))
			]));
};
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var author$project$Document$encodeDocument = function (document) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$int(document.Z)),
				_Utils_Tuple2(
				'identifier',
				elm$json$Json$Encode$string(document.bs)),
				_Utils_Tuple2(
				'author_id',
				elm$json$Json$Encode$int(document.bP)),
				_Utils_Tuple2(
				'author_name',
				elm$json$Json$Encode$string(document.bQ)),
				_Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(document.as)),
				_Utils_Tuple2(
				'content',
				elm$json$Json$Encode$string(document.az)),
				_Utils_Tuple2(
				'tags',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, document.cg)),
				_Utils_Tuple2(
				'parent_id',
				elm$json$Json$Encode$int(document.bz)),
				_Utils_Tuple2(
				'parent_title',
				elm$json$Json$Encode$string(document.b9)),
				_Utils_Tuple2(
				'attributes',
				author$project$Document$encodeDocumentAttributes(document))
			]));
};
var author$project$Document$encodeDocumentRecord = function (document) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'document',
				author$project$Document$encodeDocument(document))
			]));
};
var author$project$Document$updateDocumentWithQueryStringRequest = F3(
	function (tokenString, queryString, document) {
		return elm$http$Http$request(
			{
				aQ: elm$http$Http$jsonBody(
					author$project$Document$encodeDocumentRecord(document)),
				aV: elm$http$Http$expectJson(author$project$Document$documentRecordDecoder),
				aW: _List_fromArray(
					[
						A2(elm$http$Http$header, 'APIVersion', 'V2'),
						A2(elm$http$Http$header, 'Authorization', 'Bearer ' + tokenString)
					]),
				a0: 'Put',
				a8: elm$core$Maybe$Just(5000),
				bf: author$project$Configuration$backend + ('/api/documents/' + (elm$core$String$fromInt(document.Z) + ('?' + queryString))),
				bg: false
			});
	});
var author$project$Document$updateDocumentWithQueryString = F3(
	function (tokenString, queryString, document) {
		return A2(
			elm$http$Http$send,
			author$project$Document$AcknowledgeUpdateOfDocument,
			A3(author$project$Document$updateDocumentWithQueryStringRequest, tokenString, queryString, document));
	});
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Document$attachDocumentToMasterBelowCmd_ = F4(
	function (tokenString, selectedDocId_, childDocument, masterDocument) {
		var query = 'attach=below&child=' + (elm$core$String$fromInt(childDocument.Z) + ('&current=' + elm$core$String$fromInt(selectedDocId_)));
		var masterDocumentId = childDocument.bz;
		var _n0 = _Utils_eq(masterDocumentId, masterDocument.Z);
		if (!_n0) {
			return elm$core$Platform$Cmd$none;
		} else {
			return A3(author$project$Document$updateDocumentWithQueryString, tokenString, query, masterDocument);
		}
	});
var author$project$Document$attachDocumentToMasterBelowCmd = F4(
	function (tokenString, selectedDocId_, childDocument, maybeMasterDocument) {
		if (maybeMasterDocument.$ === 1) {
			return elm$core$Platform$Cmd$none;
		} else {
			var masterDocument = maybeMasterDocument.a;
			return A4(author$project$Document$attachDocumentToMasterBelowCmd_, tokenString, selectedDocId_, childDocument, masterDocument);
		}
	});
var author$project$Document$AcknowledgeDocumentDeleted = function (a) {
	return {$: 3, a: a};
};
var author$project$Document$replyDecoder = A2(elm$json$Json$Decode$field, 'reply', elm$json$Json$Decode$string);
var author$project$Document$deleteDocumentRequest = F2(
	function (tokenString, document) {
		return elm$http$Http$request(
			{
				aQ: elm$http$Http$jsonBody(
					author$project$Document$encodeDocumentRecord(document)),
				aV: elm$http$Http$expectJson(author$project$Document$replyDecoder),
				aW: _List_fromArray(
					[
						A2(elm$http$Http$header, 'APIVersion', 'V2'),
						A2(elm$http$Http$header, 'Authorization', 'Bearer ' + tokenString)
					]),
				a0: 'Delete',
				a8: elm$core$Maybe$Just(5000),
				bf: author$project$Configuration$backend + ('/api/documents/' + elm$core$String$fromInt(document.Z)),
				bg: false
			});
	});
var author$project$Document$deleteDocument = F2(
	function (tokenString, document) {
		return A2(
			elm$http$Http$send,
			author$project$Document$AcknowledgeDocumentDeleted,
			A2(author$project$Document$deleteDocumentRequest, tokenString, document));
	});
var author$project$Document$saveDocumentRequest = F2(
	function (tokenString, document) {
		return elm$http$Http$request(
			{
				aQ: elm$http$Http$jsonBody(
					author$project$Document$encodeDocumentRecord(document)),
				aV: elm$http$Http$expectJson(author$project$Document$documentRecordDecoder),
				aW: _List_fromArray(
					[
						A2(elm$http$Http$header, 'APIVersion', 'V2'),
						A2(elm$http$Http$header, 'Authorization', 'Bearer ' + tokenString)
					]),
				a0: 'Put',
				a8: elm$core$Maybe$Just(5000),
				bf: author$project$Configuration$backend + ('/api/documents/' + elm$core$String$fromInt(document.Z)),
				bg: false
			});
	});
var author$project$Document$saveDocument = F2(
	function (tokenString, document) {
		return A2(
			elm$http$Http$send,
			author$project$Document$AcknowledgeUpdateOfDocument,
			A2(author$project$Document$saveDocumentRequest, tokenString, document));
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
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$String$trim = _String_trim;
var author$project$Document$selectedDocId = function (document) {
	return A2(
		elm$core$Maybe$withDefault,
		0,
		elm$core$String$toInt(
			A2(
				elm$core$Maybe$withDefault,
				'0',
				elm$core$List$head(
					A2(
						elm$core$List$drop,
						1,
						A2(
							elm$core$String$split,
							':',
							elm$core$String$trim(
								A2(
									elm$core$Maybe$withDefault,
									'placeUnder:0',
									elm$core$List$head(
										A2(
											elm$core$List$drop,
											1,
											A2(elm$core$String$split, ',', document.az)))))))))));
};
var author$project$DocumentDictionary$matchId = F3(
	function (id, key, _n0) {
		var dict = _n0;
		var maybeDocument = A2(elm$core$Dict$get, key, dict);
		if (maybeDocument.$ === 1) {
			return false;
		} else {
			var doc = maybeDocument.a;
			return _Utils_eq(doc.Z, id);
		}
	});
var author$project$DocumentDictionary$PutDocumentInDictionaryAsTexMacros = elm$core$Basics$identity;
var author$project$DocumentDictionary$putTexMacroDocumentInDictionaryById = F2(
	function (id, maybeTokenString) {
		return A2(
			elm$http$Http$send,
			elm$core$Basics$identity,
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
var author$project$Utility$lookUpKeyInTagList = F2(
	function (key, tagList) {
		var _n0 = A2(author$project$Utility$findTag, key, tagList);
		if (_n0.$ === 1) {
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
var author$project$DocumentDictionary$loadTexMacros = F4(
	function (maybeTokenString, document, tagList, documentDictionary) {
		var maybeTexMacroIdString = A2(author$project$Utility$lookUpKeyInTagList, 'texmacros', tagList);
		var _n0 = function () {
			if (maybeTexMacroIdString.$ === 1) {
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
			if (!_n2.b) {
				return elm$core$Platform$Cmd$none;
			} else {
				var id_ = _n2.b;
				return A2(author$project$DocumentDictionary$putTexMacroDocumentInDictionaryById, id_, maybeTokenString);
			}
		} else {
			var id_ = _n2.b;
			return A2(author$project$DocumentDictionary$putTexMacroDocumentInDictionaryById, id_, maybeTokenString);
		}
	});
var author$project$DocumentDictionary$put = F3(
	function (key, document, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, document, dict);
	});
var author$project$DocumentList$documents = function (_n0) {
	var documentList = _n0;
	return documentList.J;
};
var author$project$DocumentList$setDocuments = F2(
	function (listOfDocuments, _n0) {
		var documentListRecord = _n0;
		return _Utils_update(
			documentListRecord,
			{J: listOfDocuments});
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
var author$project$Utility$listDeleteAt = F2(
	function (k, list) {
		return _Utils_ap(
			A2(elm$core$List$take, k, list),
			A2(elm$core$List$drop, k + 1, list));
	});
var elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$findIndex = elm_community$list_extra$List$Extra$findIndexHelp(0);
var author$project$DocumentList$deleteItemInDocumentListAt = F2(
	function (targetDocId, documentList) {
		var _n0 = !targetDocId;
		if (_n0) {
			return documentList;
		} else {
			var maybeTargetIndex = A2(
				elm_community$list_extra$List$Extra$findIndex,
				function (doc) {
					return _Utils_eq(doc.Z, targetDocId);
				},
				author$project$DocumentList$documents(documentList));
			if (maybeTargetIndex.$ === 1) {
				return documentList;
			} else {
				var k = maybeTargetIndex.a;
				return A2(
					author$project$DocumentList$setDocuments,
					A2(
						author$project$Utility$listDeleteAt,
						k,
						author$project$DocumentList$documents(documentList)),
					documentList);
			}
		}
	});
var author$project$DocumentList$documentListLength = function (_n0) {
	var documentList = _n0;
	return elm$core$List$length(documentList.J);
};
var author$project$DocumentList$notFoundDocument = function () {
	var doc = author$project$Document$basicDocument;
	return _Utils_update(
		doc,
		{as: 'Not found'});
}();
var author$project$DocumentList$getFirst = function (documentList) {
	return A2(
		elm$core$Maybe$withDefault,
		author$project$DocumentList$notFoundDocument,
		elm$core$List$head(
			author$project$DocumentList$documents(documentList)));
};
var author$project$DocumentList$loadMasterDocumentRequest = F2(
	function (maybeUser, docId) {
		var _n0 = function () {
			if (maybeUser.$ === 1) {
				return _Utils_Tuple2(
					'/api/public/documents?master=' + elm$core$String$fromInt(docId),
					_List_fromArray(
						[
							A2(elm$http$Http$header, 'APIVersion', 'V2')
						]));
			} else {
				var user = maybeUser.a;
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
				aQ: elm$http$Http$jsonBody(elm$json$Json$Encode$null),
				aV: elm$http$Http$expectJson(author$project$DocumentList$documentListDecoder),
				aW: headers,
				a0: 'Get',
				a8: elm$core$Maybe$Just(5000),
				bf: _Utils_ap(author$project$Configuration$backend, route),
				bg: false
			});
	});
var author$project$DocumentList$loadMasterDocument = F2(
	function (maybeUser, docId) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$ReceiveDocumentList,
			A2(author$project$DocumentList$loadMasterDocumentRequest, maybeUser, docId));
	});
var author$project$DocumentList$ReceiveDocumentListWithSelectedId = function (a) {
	return {$: 1, a: a};
};
var author$project$DocumentList$loadMasterDocumentAndSelect = F2(
	function (maybeUser, docId) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$ReceiveDocumentListWithSelectedId,
			A2(author$project$DocumentList$loadMasterDocumentRequest, maybeUser, docId));
	});
var author$project$DocumentList$ReceiveDocumentListAndPreserveCurrentSelection = function (a) {
	return {$: 3, a: a};
};
var author$project$DocumentList$loadMasterDocumentWithCurrentSelection = F2(
	function (maybeUser, docId) {
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$ReceiveDocumentListAndPreserveCurrentSelection,
			A2(author$project$DocumentList$loadMasterDocumentRequest, maybeUser, docId));
	});
var author$project$DocumentList$prepend = F2(
	function (document, _n0) {
		var documentListRecord = _n0;
		return _Utils_update(
			documentListRecord,
			{
				J: A2(elm$core$List$cons, document, documentListRecord.J),
				M: elm$core$Maybe$Just(document)
			});
	});
var author$project$DocumentList$select = F2(
	function (maybeSelectedDocument, _n0) {
		var documentList = _n0;
		return {J: documentList.J, M: maybeSelectedDocument};
	});
var author$project$Utility$listInsertAt = F3(
	function (k, item, list) {
		return _Utils_ap(
			A2(elm$core$List$take, k, list),
			_Utils_ap(
				_List_fromArray(
					[item]),
				A2(elm$core$List$drop, k, list)));
	});
var author$project$DocumentList$nextDocumentList = F3(
	function (targetDocId, document, documentList) {
		var _n0 = !targetDocId;
		if (_n0) {
			return A2(author$project$DocumentList$prepend, document, documentList);
		} else {
			var maybeTargetIndex = A2(
				elm_community$list_extra$List$Extra$findIndex,
				function (doc) {
					return _Utils_eq(doc.Z, targetDocId);
				},
				author$project$DocumentList$documents(documentList));
			if (maybeTargetIndex.$ === 1) {
				return A2(author$project$DocumentList$prepend, document, documentList);
			} else {
				var k = maybeTargetIndex.a;
				return A2(
					author$project$DocumentList$select,
					elm$core$Maybe$Just(document),
					A2(
						author$project$DocumentList$setDocuments,
						A3(
							author$project$Utility$listInsertAt,
							k + 1,
							document,
							author$project$DocumentList$documents(documentList)),
						documentList));
			}
		}
	});
var author$project$DocumentList$selectFirst = function (documentList) {
	var maybeFirstDocument = elm$core$List$head(
		author$project$DocumentList$documents(documentList));
	return A2(author$project$DocumentList$select, maybeFirstDocument, documentList);
};
var author$project$Main$DeleteIsArmed = 1;
var author$project$Main$DocDictMsg = function (a) {
	return {$: 22, a: a};
};
var author$project$Main$ShowToolPanel = 0;
var author$project$Main$UserMsg = function (a) {
	return {$: 17, a: a};
};
var author$project$Main$DebounceMsg = function (a) {
	return {$: 26, a: a};
};
var jinjor$elm_debounce$Debounce$Later = function (a) {
	return {$: 2, a: a};
};
var jinjor$elm_debounce$Debounce$later = jinjor$elm_debounce$Debounce$Later;
var author$project$Main$debounceConfig = {
	eQ: jinjor$elm_debounce$Debounce$later(250),
	e9: author$project$Main$DebounceMsg
};
var author$project$Main$AskToEraseLocalStorage = function (a) {
	return {$: 6, a: a};
};
var author$project$Main$eraseLocalStorage = author$project$Main$sendInfoOutside(
	author$project$Main$AskToEraseLocalStorage(elm$json$Json$Encode$null));
var author$project$Main$handleHttpError = function (error) {
	switch (error.$) {
		case 0:
			var str = error.a;
			return str;
		case 1:
			return 'timeout';
		case 2:
			return 'Network error';
		case 3:
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
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {d9: index, ei: match, em: number, eT: submatches};
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{cr: false, cT: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var elm$regex$Regex$split = _Regex_splitAtMost(_Regex_infinity);
var author$project$Query$parseQueryHelper_ = function (input) {
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
var elm$core$String$words = _String_words;
var author$project$Query$parseQueryHelper = function (input) {
	var headWord = A2(
		elm$core$Maybe$withDefault,
		'xxx',
		elm$core$List$head(
			elm$core$String$words(input)));
	var _n0 = elm$core$String$toInt(headWord);
	if (_n0.$ === 1) {
		return author$project$Query$parseQueryHelper_(input);
	} else {
		var id = _n0.a;
		return 'id=' + elm$core$String$fromInt(id);
	}
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
var author$project$Query$parse = function (input_) {
	var input = A3(elm$core$String$replace, 'author=', 'authorname=', input_);
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
var author$project$Main$getPublicDocuments = F2(
	function (model, queryString) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{t: 0, e: 'query: ' + queryString, s: 1}),
			A2(
				elm$core$Platform$Cmd$map,
				author$project$Main$DocListMsg,
				A2(
					author$project$DocumentList$findDocuments,
					elm$core$Maybe$Nothing,
					author$project$Query$parse(queryString))));
	});
var author$project$Main$getUserDocuments = F2(
	function (model, queryString) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{s: 1}),
			A2(
				elm$core$Platform$Cmd$map,
				author$project$Main$DocListMsg,
				A2(
					author$project$DocumentList$findDocuments,
					model.h,
					author$project$Query$parse(queryString))));
	});
var author$project$Main$doSearch = function (model) {
	var _n0 = model.t;
	if (!_n0) {
		return A2(author$project$Main$getPublicDocuments, model, model.aK);
	} else {
		return A2(author$project$Main$getUserDocuments, model, model.aK);
	}
};
var author$project$Main$headKey = function (keyList) {
	return A2(
		elm$core$Maybe$withDefault,
		ohanhi$keyboard$Keyboard$F20,
		elm$core$List$head(keyList));
};
var author$project$User$getTokenStringFromMaybeUser = function (maybeUser) {
	if (maybeUser.$ === 1) {
		return 'invalidTokenString';
	} else {
		var user = maybeUser.a;
		return author$project$User$getTokenString(user);
	}
};
var author$project$Main$saveCurrentDocument = function (model) {
	var tokenString = author$project$User$getTokenStringFromMaybeUser(model.h);
	var tags = A2(
		elm$core$List$map,
		elm$core$String$trim,
		A2(elm$core$String$split, ',', model.bF));
	var currentDocument = model.a;
	var nextCurrentDocument = _Utils_update(
		currentDocument,
		{cg: tags, as: model.aC});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				a: nextCurrentDocument,
				z: false,
				e: 'Saved document: ' + elm$core$String$fromInt(model.a.Z)
			}),
		A2(
			elm$core$Platform$Cmd$map,
			author$project$Main$DocMsg,
			A2(author$project$Document$saveDocument, tokenString, nextCurrentDocument)));
};
var author$project$Main$handleKey = F2(
	function (model, key) {
		_n0$2:
		while (true) {
			switch (key.$) {
				case 15:
					return author$project$Main$doSearch(model);
				case 0:
					if (key.a === 's') {
						return author$project$Main$saveCurrentDocument(model);
					} else {
						break _n0$2;
					}
				default:
					break _n0$2;
			}
		}
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Main$respondToContolCommand = F2(
	function (model, pressedKeys) {
		var newModel = _Utils_update(
			model,
			{
				a6: author$project$Main$headKey(pressedKeys)
			});
		return A2(
			author$project$Main$handleKey,
			newModel,
			author$project$Main$headKey(pressedKeys));
	});
var ohanhi$keyboard$Keyboard$Control = {$: 4};
var author$project$Main$keyGatweway = F2(
	function (model, pressedKeys) {
		if (_Utils_eq(model.a6, ohanhi$keyboard$Keyboard$Control)) {
			return A2(author$project$Main$respondToContolCommand, model, pressedKeys);
		} else {
			var _n0 = author$project$Main$headKey(pressedKeys);
			if (_n0.$ === 1) {
				return author$project$Main$doSearch(model);
			} else {
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a6: author$project$Main$headKey(pressedKeys)
						}),
					elm$core$Platform$Cmd$none);
			}
		}
	});
var author$project$Document$NewDocumentCreated = function (a) {
	return {$: 1, a: a};
};
var author$project$Document$createDocumentRequest = F2(
	function (tokenString, document) {
		return elm$http$Http$request(
			{
				aQ: elm$http$Http$jsonBody(
					author$project$Document$encodeDocumentRecord(document)),
				aV: elm$http$Http$expectJson(author$project$Document$documentRecordDecoder),
				aW: _List_fromArray(
					[
						A2(elm$http$Http$header, 'APIVersion', 'V2'),
						A2(elm$http$Http$header, 'Authorization', 'Bearer ' + tokenString)
					]),
				a0: 'Post',
				a8: elm$core$Maybe$Just(5000),
				bf: author$project$Configuration$backend + '/api/documents/',
				bg: false
			});
	});
var author$project$Document$createDocument = F2(
	function (tokenString, document) {
		return A2(
			elm$http$Http$send,
			author$project$Document$NewDocumentCreated,
			A2(author$project$Document$createDocumentRequest, tokenString, document));
	});
var author$project$DocumentList$selected = function (_n0) {
	var docListRecord = _n0;
	return docListRecord.M;
};
var author$project$User$userId = function (_n0) {
	var user = _n0;
	return user.Z;
};
var author$project$User$username = function (_n0) {
	var user = _n0;
	return user.aw;
};
var author$project$Main$makeNewDocumentWithParent = F4(
	function (parentId, parentTitle, selectedDocumentId, user) {
		var newDocument_ = author$project$Document$basicDocument;
		return _Utils_update(
			newDocument_,
			{
				bP: author$project$User$userId(user),
				bQ: author$project$User$username(user),
				az: 'New Child Document of ' + (parentTitle + (', placeUnder:' + elm$core$String$fromInt(selectedDocumentId))),
				bz: parentId,
				b9: parentTitle,
				as: 'New Child Document'
			});
	});
var author$project$Main$newDocumentForUserWithParent = F2(
	function (user, model) {
		var selectedDocumentId = function () {
			var _n2 = author$project$DocumentList$selected(model.m);
			if (_n2.$ === 1) {
				return 0;
			} else {
				var selectedDoc = _n2.a;
				return selectedDoc.Z;
			}
		}();
		var headDocument = author$project$DocumentList$getFirst(model.m);
		var parentId = function () {
			var _n1 = headDocument.bY;
			if (_n1 === 1) {
				return headDocument.Z;
			} else {
				return 0;
			}
		}();
		var parentTitle = function () {
			var _n0 = headDocument.bY;
			if (_n0 === 1) {
				return headDocument.as;
			} else {
				return '';
			}
		}();
		return A2(
			author$project$Document$createDocument,
			author$project$User$getTokenString(user),
			A4(author$project$Main$makeNewDocumentWithParent, parentId, parentTitle, selectedDocumentId, user));
	});
var author$project$Main$newChildDocument = function (model) {
	var _n0 = model.h;
	if (_n0.$ === 1) {
		return elm$core$Platform$Cmd$none;
	} else {
		var user = _n0.a;
		return A2(author$project$Main$newDocumentForUserWithParent, user, model);
	}
};
var author$project$Configuration$newMiniLatexDocumentText = '\n\\tableofcontents\n\n\\section{Examples}\n\nThis is a sample document with a few MiniLatex examples.\nClick on \\strong{Edit attributes} to change the title\nand other document attributes.\n\n\\subsection{A formula}\n\n$$\\int_0^1 x^n dx = \\frac{1}{n+1}$$\n\n\n\\subsection{An image}\n\n\\image{http://noteimages.s3.amazonaws.com/uploads/butterfly.jpg}{}{width: 450}\n\n\\subsection{A hyperlink}\n\n\\href{\\https://nytimes.com}{The New York Times}\n';
var author$project$SystemDocument$newDocument = _Utils_update(
	author$project$Document$basicDocument,
	{az: author$project$Configuration$newMiniLatexDocumentText, as: 'New document'});
var author$project$Main$makeNewDocument = function (user) {
	var newDocument_ = author$project$SystemDocument$newDocument;
	return _Utils_update(
		newDocument_,
		{
			bP: author$project$User$userId(user),
			bQ: author$project$User$username(user)
		});
};
var author$project$Main$newDocumentForUser = F2(
	function (user, model) {
		var selectedDocumentId = function () {
			var _n1 = author$project$DocumentList$selected(model.m);
			if (_n1.$ === 1) {
				return 0;
			} else {
				var selectedDoc = _n1.a;
				return selectedDoc.Z;
			}
		}();
		var headDocument = author$project$DocumentList$getFirst(model.m);
		var parentId = function () {
			var _n0 = headDocument.bY;
			if (_n0 === 1) {
				return headDocument.Z;
			} else {
				return 0;
			}
		}();
		return A2(
			author$project$Document$createDocument,
			author$project$User$getTokenString(user),
			author$project$Main$makeNewDocument(user));
	});
var author$project$Main$newDocument = function (model) {
	var _n0 = model.h;
	if (_n0.$ === 1) {
		return elm$core$Platform$Cmd$none;
	} else {
		var user = _n0.a;
		return A2(author$project$Main$newDocumentForUser, user, model);
	}
};
var author$project$DocumentList$make = F2(
	function (document, listOfDocuments) {
		var documentListRecord = {
			J: A2(elm$core$List$cons, document, listOfDocuments),
			M: elm$core$Maybe$Just(document)
		};
		return documentListRecord;
	});
var author$project$DocumentList$RestoreDocumentList = function (a) {
	return {$: 2, a: a};
};
var author$project$DocumentList$retrievDocumentsFromIntList = F2(
	function (maybeUser, intList) {
		var ids = A2(
			elm$core$String$join,
			',',
			A2(
				elm$core$List$map,
				elm$core$String$fromInt,
				elm$core$List$reverse(intList.aZ)));
		var queryString = 'idlist=' + ids;
		return A2(
			elm$http$Http$send,
			author$project$DocumentList$RestoreDocumentList,
			A2(author$project$DocumentList$findDocumentsRequest, maybeUser, queryString));
	});
var author$project$User$getToken = function (user) {
	return author$project$User$getTokenString(user);
};
var author$project$Main$processInfoForElm = F2(
	function (model, infoForElm_) {
		switch (infoForElm_.$) {
			case 0:
				var document = infoForElm_.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: document,
							m: A2(author$project$DocumentList$make, document, _List_Nil),
							e: 'Outside infoForElm'
						}),
					elm$core$Platform$Cmd$none);
			case 2:
				var user = infoForElm_.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							h: elm$core$Maybe$Just(user),
							E: elm$core$Maybe$Just(
								author$project$User$getToken(user)),
							e: 'Outside infoForElm'
						}),
					elm$core$Platform$Cmd$none);
			default:
				var intList = infoForElm_.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bq: intList}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocListMsg,
						A2(author$project$DocumentList$retrievDocumentsFromIntList, model.h, intList)));
		}
	});
var author$project$Main$pushUrl = _Platform_outgoingPort('pushUrl', elm$json$Json$Encode$string);
var author$project$Document$encodeChildForOutside = function (child) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(child.as)),
				_Utils_Tuple2(
				'level',
				elm$json$Json$Encode$int(child.aG)),
				_Utils_Tuple2(
				'docIdentifier',
				elm$json$Json$Encode$string(child.bX)),
				_Utils_Tuple2(
				'docId',
				elm$json$Json$Encode$int(child.bW)),
				_Utils_Tuple2(
				'comment',
				elm$json$Json$Encode$string(child.bT))
			]));
};
var elm$json$Json$Encode$dict = F3(
	function (toKey, toValue, dictionary) {
		return _Json_wrap(
			A3(
				elm$core$Dict$foldl,
				F3(
					function (key, value, obj) {
						return A3(
							_Json_addField,
							toKey(key),
							toValue(value),
							obj);
					}),
				_Json_emptyObject(0),
				dictionary));
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0;
	return millis;
};
var author$project$Document$encodeDocumentForOutside = function (document) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$int(document.Z)),
				_Utils_Tuple2(
				'identifier',
				elm$json$Json$Encode$string(document.bs)),
				_Utils_Tuple2(
				'authorId',
				elm$json$Json$Encode$int(document.bP)),
				_Utils_Tuple2(
				'authorIdentifier',
				elm$json$Json$Encode$string(document.bs)),
				_Utils_Tuple2(
				'authorName',
				elm$json$Json$Encode$string(document.bQ)),
				_Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(document.as)),
				_Utils_Tuple2(
				'content',
				elm$json$Json$Encode$string(document.az)),
				_Utils_Tuple2(
				'level',
				elm$json$Json$Encode$int(document.aG)),
				_Utils_Tuple2(
				'public',
				elm$json$Json$Encode$bool(document.cb)),
				_Utils_Tuple2(
				'access',
				A3(elm$json$Json$Encode$dict, elm$core$Basics$identity, elm$json$Json$Encode$string, document.ck)),
				_Utils_Tuple2(
				'tags',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, document.cg)),
				_Utils_Tuple2(
				'children',
				A2(elm$json$Json$Encode$list, author$project$Document$encodeChildForOutside, document.cu)),
				_Utils_Tuple2(
				'parentId',
				elm$json$Json$Encode$int(document.bz)),
				_Utils_Tuple2(
				'parentTitle',
				elm$json$Json$Encode$string(document.b9)),
				_Utils_Tuple2(
				'textType',
				author$project$Document$encodeTextType(document.ch)),
				_Utils_Tuple2(
				'docType',
				author$project$Document$encodeDocType(document.bY)),
				_Utils_Tuple2(
				'archive',
				elm$json$Json$Encode$string(document.bO)),
				_Utils_Tuple2(
				'version',
				elm$json$Json$Encode$int(document.ci)),
				_Utils_Tuple2(
				'lastViewed',
				elm$json$Json$Encode$int(
					elm$time$Time$posixToMillis(document.cO))),
				_Utils_Tuple2(
				'created',
				elm$json$Json$Encode$int(
					elm$time$Time$posixToMillis(document.cy))),
				_Utils_Tuple2(
				'lastModified',
				elm$json$Json$Encode$int(
					elm$time$Time$posixToMillis(document.cR)))
			]));
};
var author$project$Main$DocumentData = function (a) {
	return {$: 0, a: a};
};
var author$project$Main$saveDocToLocalStorage = function (document) {
	return author$project$Main$sendInfoOutside(
		author$project$Main$DocumentData(
			author$project$Document$encodeDocumentForOutside(document)));
};
var author$project$DocumentList$selectedId = function (documentList) {
	var _n0 = author$project$DocumentList$selected(documentList);
	if (_n0.$ === 1) {
		return 0;
	} else {
		var document = _n0.a;
		return document.Z;
	}
};
var author$project$DocumentList$intListFromDocumentList = function (documentList) {
	return {
		aZ: A2(
			elm$core$List$map,
			function ($) {
				return $.Z;
			},
			author$project$DocumentList$documents(documentList)),
		M: author$project$DocumentList$selectedId(documentList)
	};
};
var author$project$DocumentList$documentListEncoder = function (documentList) {
	var intList = author$project$DocumentList$intListFromDocumentList(documentList);
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'selected',
				elm$json$Json$Encode$int(intList.M)),
				_Utils_Tuple2(
				'documentIds',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$int, intList.aZ))
			]));
};
var author$project$Main$DocumentListData = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$saveDocumentListToLocalStorage = function (documentList) {
	return author$project$Main$sendInfoOutside(
		author$project$Main$DocumentListData(
			author$project$DocumentList$documentListEncoder(documentList)));
};
var author$project$Main$UserData = function (a) {
	return {$: 4, a: a};
};
var author$project$User$email = function (_n0) {
	var user = _n0;
	return user.K;
};
var author$project$User$encodeUserForOutside = function (user) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'email',
				elm$json$Json$Encode$string(
					author$project$User$email(user))),
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$int(
					author$project$User$userId(user))),
				_Utils_Tuple2(
				'token',
				elm$json$Json$Encode$string(
					author$project$User$getTokenString(user))),
				_Utils_Tuple2(
				'username',
				elm$json$Json$Encode$string(
					author$project$User$username(user)))
			]));
};
var author$project$Main$sendMaybeUserDataToLocalStorage = function (maybeUser) {
	if (maybeUser.$ === 1) {
		return elm$core$Platform$Cmd$none;
	} else {
		var user = maybeUser.a;
		return author$project$Main$sendInfoOutside(
			author$project$Main$UserData(
				author$project$User$encodeUserForOutside(user)));
	}
};
var author$project$Main$UpdateEditorContent = function (a) {
	return {$: 28, a: a};
};
var author$project$Main$updateEditorContentCmd = function (str) {
	return A2(
		elm$core$Task$perform,
		author$project$Main$UpdateEditorContent,
		elm$core$Task$succeed(str));
};
var author$project$Configuration$newUserText = '\nWelcome!\n\n\\begin{itemize}\n\n\\item Click on \\strong{Home} to go to your home page.\n\n\\item Click on \\strong{Random} to explore.  \n\n\\item To find things, type something in\nthe search box, e.g., \\italic{matt}, \\italic{wave}, or \\italic{snow}.\n\n\\item To create or edit a document, click on \\strong{Write}.\n\n\\end{itemize}\n\n\n\\bigskip\n\n\\image{https://noteimages.s3.amazonaws.com/app_images/vintage-typewriter-in-black-and-white-lynn-langmade.jpg}{}{width: 450}\n';
var author$project$SystemDocument$newUser = _Utils_update(
	author$project$Document$basicDocument,
	{az: author$project$Configuration$newUserText, as: 'Welcome!'});
var author$project$Configuration$signInText = '\nThis is knode.io, ready to run MiniLatex, Asciidoc, or Markdown.\n\n$$\\int_0^1 x^n dx = \\frac{1}{n+1}$$\n\nClick on \\strong{Home} to go to your home page\n';
var author$project$SystemDocument$signIn = _Utils_update(
	author$project$Document$basicDocument,
	{az: author$project$Configuration$signInText, as: 'You are signed in'});
var author$project$Configuration$signedOutText = '\nYou are now signed out. See you later.\n';
var author$project$SystemDocument$signedOut = _Utils_update(
	author$project$Document$basicDocument,
	{az: author$project$Configuration$signedOutText, as: 'Signed out'});
var author$project$User$ReceiveToken = function (a) {
	return {$: 0, a: a};
};
var author$project$User$authenticationEncoder = F2(
	function (email_, password) {
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
								elm$json$Json$Encode$string(email_)),
								_Utils_Tuple2(
								'password',
								elm$json$Json$Encode$string(password))
							])))
				]));
	});
var author$project$User$tokenDecoder = A2(
	elm$json$Json$Decode$map,
	elm$core$Basics$identity,
	A2(elm$json$Json$Decode$field, 'token', elm$json$Json$Decode$string));
var author$project$User$tokenRequest = F2(
	function (email_, password) {
		return elm$http$Http$request(
			{
				aQ: elm$http$Http$jsonBody(
					A2(author$project$User$authenticationEncoder, email_, password)),
				aV: elm$http$Http$expectJson(author$project$User$tokenDecoder),
				aW: _List_Nil,
				a0: 'Post',
				a8: elm$core$Maybe$Just(5000),
				bf: author$project$Configuration$backend + '/api/authentication/',
				bg: false
			});
	});
var author$project$User$getTokenCmd = F2(
	function (email_, password) {
		return A2(
			elm$http$Http$send,
			author$project$User$ReceiveToken,
			A2(author$project$User$tokenRequest, email_, password));
	});
var author$project$User$TokenClaims = F2(
	function (username, userId) {
		return {de: userId, aw: username};
	});
var author$project$User$jwtDecoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'user_id',
	elm$json$Json$Decode$int,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'username',
		elm$json$Json$Decode$string,
		elm$json$Json$Decode$succeed(author$project$User$TokenClaims)));
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var simonh1000$elm_jwt$Base64$Decode$pad = function (input) {
	var _n0 = 4 % elm$core$String$length(input);
	switch (_n0) {
		case 3:
			return input + '=';
		case 2:
			return input + '==';
		default:
			return input;
	}
};
var elm$core$String$foldl = _String_foldl;
var elm$core$Bitwise$or = _Bitwise_or;
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var simonh1000$elm_jwt$Base64$Decode$charToInt = function (_char) {
	switch (_char) {
		case 'A':
			return 0;
		case 'B':
			return 1;
		case 'C':
			return 2;
		case 'D':
			return 3;
		case 'E':
			return 4;
		case 'F':
			return 5;
		case 'G':
			return 6;
		case 'H':
			return 7;
		case 'I':
			return 8;
		case 'J':
			return 9;
		case 'K':
			return 10;
		case 'L':
			return 11;
		case 'M':
			return 12;
		case 'N':
			return 13;
		case 'O':
			return 14;
		case 'P':
			return 15;
		case 'Q':
			return 16;
		case 'R':
			return 17;
		case 'S':
			return 18;
		case 'T':
			return 19;
		case 'U':
			return 20;
		case 'V':
			return 21;
		case 'W':
			return 22;
		case 'X':
			return 23;
		case 'Y':
			return 24;
		case 'Z':
			return 25;
		case 'a':
			return 26;
		case 'b':
			return 27;
		case 'c':
			return 28;
		case 'd':
			return 29;
		case 'e':
			return 30;
		case 'f':
			return 31;
		case 'g':
			return 32;
		case 'h':
			return 33;
		case 'i':
			return 34;
		case 'j':
			return 35;
		case 'k':
			return 36;
		case 'l':
			return 37;
		case 'm':
			return 38;
		case 'n':
			return 39;
		case 'o':
			return 40;
		case 'p':
			return 41;
		case 'q':
			return 42;
		case 'r':
			return 43;
		case 's':
			return 44;
		case 't':
			return 45;
		case 'u':
			return 46;
		case 'v':
			return 47;
		case 'w':
			return 48;
		case 'x':
			return 49;
		case 'y':
			return 50;
		case 'z':
			return 51;
		case '0':
			return 52;
		case '1':
			return 53;
		case '2':
			return 54;
		case '3':
			return 55;
		case '4':
			return 56;
		case '5':
			return 57;
		case '6':
			return 58;
		case '7':
			return 59;
		case '8':
			return 60;
		case '9':
			return 61;
		case '+':
			return 62;
		case '/':
			return 63;
		default:
			return 0;
	}
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Char$fromCode = _Char_fromCode;
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$String$fromList = _String_fromList;
var simonh1000$elm_jwt$Base64$Decode$intToString = function (_int) {
	if (_int <= 65536) {
		return elm$core$String$fromChar(
			elm$core$Char$fromCode(_int));
	} else {
		var c = _int - 65536;
		return elm$core$String$fromList(
			_List_fromArray(
				[
					elm$core$Char$fromCode(55296 | (c >>> 10)),
					elm$core$Char$fromCode(56320 | (1023 & c))
				]));
	}
};
var simonh1000$elm_jwt$Base64$Decode$add = F2(
	function (_char, _n0) {
		var curr = _n0.a;
		var need = _n0.b;
		var res = _n0.c;
		var shiftAndAdd = function (_int) {
			return (63 & _int) | (curr << 6);
		};
		return (!need) ? ((!(128 & _char)) ? _Utils_Tuple3(
			0,
			0,
			_Utils_ap(
				res,
				simonh1000$elm_jwt$Base64$Decode$intToString(_char))) : (((224 & _char) === 192) ? _Utils_Tuple3(31 & _char, 1, res) : (((240 & _char) === 224) ? _Utils_Tuple3(15 & _char, 2, res) : _Utils_Tuple3(7 & _char, 3, res)))) : ((need === 1) ? _Utils_Tuple3(
			0,
			0,
			_Utils_ap(
				res,
				simonh1000$elm_jwt$Base64$Decode$intToString(
					shiftAndAdd(_char)))) : _Utils_Tuple3(
			shiftAndAdd(_char),
			need - 1,
			res));
	});
var simonh1000$elm_jwt$Base64$Decode$toUTF16 = F2(
	function (_char, acc) {
		return _Utils_Tuple3(
			0,
			0,
			A2(
				simonh1000$elm_jwt$Base64$Decode$add,
				255 & (_char >>> 0),
				A2(
					simonh1000$elm_jwt$Base64$Decode$add,
					255 & (_char >>> 8),
					A2(simonh1000$elm_jwt$Base64$Decode$add, 255 & (_char >>> 16), acc))));
	});
var simonh1000$elm_jwt$Base64$Decode$chomp = F2(
	function (char_, _n0) {
		var curr = _n0.a;
		var cnt = _n0.b;
		var utf8ToUtf16 = _n0.c;
		var _char = simonh1000$elm_jwt$Base64$Decode$charToInt(char_);
		if (cnt === 3) {
			return A2(simonh1000$elm_jwt$Base64$Decode$toUTF16, curr | _char, utf8ToUtf16);
		} else {
			return _Utils_Tuple3((_char << ((3 - cnt) * 6)) | curr, cnt + 1, utf8ToUtf16);
		}
	});
var simonh1000$elm_jwt$Base64$Decode$initial = _Utils_Tuple3(
	0,
	0,
	_Utils_Tuple3(0, 0, ''));
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm$core$String$slice, 0, -n, string);
	});
var elm$core$String$endsWith = _String_endsWith;
var simonh1000$elm_jwt$Base64$Decode$stripNulls = F2(
	function (input, output) {
		return A2(elm$core$String$endsWith, '==', input) ? A2(elm$core$String$dropRight, 2, output) : (A2(elm$core$String$endsWith, '=', input) ? A2(elm$core$String$dropRight, 1, output) : output);
	});
var elm$regex$Regex$contains = _Regex_contains;
var simonh1000$elm_jwt$Base64$Decode$validBase64Regex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^([A-Za-z0-9\\/+]{4})*([A-Za-z0-9\\/+]{2}[A-Za-z0-9\\/+=]{2})?$'));
var simonh1000$elm_jwt$Base64$Decode$validate = function (input) {
	return A2(elm$regex$Regex$contains, simonh1000$elm_jwt$Base64$Decode$validBase64Regex, input) ? elm$core$Result$Ok(input) : elm$core$Result$Err('Invalid base64');
};
var simonh1000$elm_jwt$Base64$Decode$wrapUp = function (_n0) {
	var _n1 = _n0.c;
	var need = _n1.b;
	var res = _n1.c;
	return (need > 0) ? elm$core$Result$Err('Invalid UTF-16') : elm$core$Result$Ok(res);
};
var simonh1000$elm_jwt$Base64$Decode$validateAndDecode = function (input) {
	return A2(
		elm$core$Result$map,
		simonh1000$elm_jwt$Base64$Decode$stripNulls(input),
		A2(
			elm$core$Result$andThen,
			A2(
				elm$core$Basics$composeR,
				A2(elm$core$String$foldl, simonh1000$elm_jwt$Base64$Decode$chomp, simonh1000$elm_jwt$Base64$Decode$initial),
				simonh1000$elm_jwt$Base64$Decode$wrapUp),
			simonh1000$elm_jwt$Base64$Decode$validate(input)));
};
var simonh1000$elm_jwt$Base64$Decode$decode = A2(elm$core$Basics$composeR, simonh1000$elm_jwt$Base64$Decode$pad, simonh1000$elm_jwt$Base64$Decode$validateAndDecode);
var simonh1000$elm_jwt$Base64$decode = simonh1000$elm_jwt$Base64$Decode$decode;
var simonh1000$elm_jwt$Jwt$TokenDecodeError = function (a) {
	return {$: 4, a: a};
};
var simonh1000$elm_jwt$Jwt$TokenProcessingError = function (a) {
	return {$: 3, a: a};
};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var simonh1000$elm_jwt$Jwt$fixlength = function (s) {
	var _n0 = A2(
		elm$core$Basics$modBy,
		4,
		elm$core$String$length(s));
	switch (_n0) {
		case 0:
			return elm$core$Result$Ok(s);
		case 2:
			return elm$core$Result$Ok(
				elm$core$String$concat(
					_List_fromArray(
						[s, '=='])));
		case 3:
			return elm$core$Result$Ok(
				elm$core$String$concat(
					_List_fromArray(
						[s, '='])));
		default:
			return elm$core$Result$Err(
				simonh1000$elm_jwt$Jwt$TokenProcessingError('Wrong length'));
	}
};
var elm$core$String$map = _String_map;
var simonh1000$elm_jwt$Jwt$unurl = function () {
	var fix = function (c) {
		switch (c) {
			case '-':
				return '+';
			case '_':
				return '/';
			default:
				return c;
		}
	};
	return elm$core$String$map(fix);
}();
var simonh1000$elm_jwt$Jwt$getTokenBody = function (token) {
	var processor = A2(
		elm$core$Basics$composeR,
		simonh1000$elm_jwt$Jwt$unurl,
		A2(
			elm$core$Basics$composeR,
			elm$core$String$split('.'),
			elm$core$List$map(simonh1000$elm_jwt$Jwt$fixlength)));
	var _n0 = processor(token);
	_n0$2:
	while (true) {
		if (_n0.b && _n0.b.b) {
			if (_n0.b.a.$ === 1) {
				if (_n0.b.b.b && (!_n0.b.b.b.b)) {
					var _n1 = _n0.b;
					var e = _n1.a.a;
					var _n2 = _n1.b;
					return elm$core$Result$Err(e);
				} else {
					break _n0$2;
				}
			} else {
				if (_n0.b.b.b && (!_n0.b.b.b.b)) {
					var _n3 = _n0.b;
					var encBody = _n3.a.a;
					var _n4 = _n3.b;
					return elm$core$Result$Ok(encBody);
				} else {
					break _n0$2;
				}
			}
		} else {
			break _n0$2;
		}
	}
	return elm$core$Result$Err(
		simonh1000$elm_jwt$Jwt$TokenProcessingError('Token has invalid shape'));
};
var simonh1000$elm_jwt$Jwt$decodeToken = function (dec) {
	return A2(
		elm$core$Basics$composeR,
		simonh1000$elm_jwt$Jwt$getTokenBody,
		A2(
			elm$core$Basics$composeR,
			elm$core$Result$andThen(
				A2(
					elm$core$Basics$composeR,
					simonh1000$elm_jwt$Base64$decode,
					elm$core$Result$mapError(simonh1000$elm_jwt$Jwt$TokenProcessingError))),
			elm$core$Result$andThen(
				A2(
					elm$core$Basics$composeR,
					elm$json$Json$Decode$decodeString(dec),
					elm$core$Result$mapError(simonh1000$elm_jwt$Jwt$TokenDecodeError)))));
};
var author$project$User$maybeUserFromEmailAndToken = F2(
	function (email_, token) {
		var _n0 = A2(simonh1000$elm_jwt$Jwt$decodeToken, author$project$User$jwtDecoder, token);
		if (!_n0.$) {
			var value = _n0.a;
			var userRecord = {K: email_, Z: value.de, bH: token, aw: value.aw};
			return elm$core$Maybe$Just(userRecord);
		} else {
			var error = _n0.a;
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$User$readToken = function (maybeToken) {
	if (maybeToken.$ === 1) {
		return elm$core$Maybe$Nothing;
	} else {
		var str = maybeToken.a;
		return elm$core$Maybe$Just(str);
	}
};
var author$project$User$RespondToNewUser = function (a) {
	return {$: 1, a: a};
};
var author$project$User$registrationEncoder = F4(
	function (email_, username_, name_, password_) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'user',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'username',
								elm$json$Json$Encode$string(username_)),
								_Utils_Tuple2(
								'name',
								elm$json$Json$Encode$string(name_)),
								_Utils_Tuple2(
								'email',
								elm$json$Json$Encode$string(email_)),
								_Utils_Tuple2(
								'password',
								elm$json$Json$Encode$string(password_))
							])))
				]));
	});
var author$project$User$registerUserRequest = F4(
	function (email_, username_, name_, password_) {
		return elm$http$Http$request(
			{
				aQ: elm$http$Http$jsonBody(
					A4(author$project$User$registrationEncoder, email_, username_, name_, password_)),
				aV: elm$http$Http$expectJson(author$project$User$tokenDecoder),
				aW: _List_fromArray(
					[
						A2(elm$http$Http$header, 'APIVersion', 'V2')
					]),
				a0: 'Post',
				a8: elm$core$Maybe$Just(5000),
				bf: author$project$Configuration$backend + '/api/users',
				bg: false
			});
	});
var author$project$User$registerUser = F4(
	function (email_, username_, name_, password_) {
		return A2(
			elm$http$Http$send,
			author$project$User$RespondToNewUser,
			A4(author$project$User$registerUserRequest, email_, username_, name_, password_));
	});
var author$project$User$stringFromToken = function (_n0) {
	var str = _n0;
	return str;
};
var elm$core$String$reverse = _String_reverse;
var elm$core$String$toLower = _String_toLower;
var elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? elm$core$Maybe$Nothing : elm$core$List$head(
			A2(elm$core$List$drop, idx, xs));
	});
var jinjor$elm_debounce$Debounce$Flush = function (a) {
	return {$: 1, a: a};
};
var jinjor$elm_debounce$Debounce$SendIfLengthNotChangedFrom = function (a) {
	return {$: 2, a: a};
};
var elm$core$Process$sleep = _Process_sleep;
var jinjor$elm_debounce$Debounce$delayCmd = F2(
	function (delay, msg) {
		return A2(
			elm$core$Task$perform,
			function (_n0) {
				return msg;
			},
			elm$core$Process$sleep(delay));
	});
var jinjor$elm_debounce$Debounce$length = function (_n0) {
	var input = _n0.R;
	return elm$core$List$length(input);
};
var jinjor$elm_debounce$Debounce$push = F3(
	function (config, a, _n0) {
		var d = _n0;
		var newDebounce = _Utils_update(
			d,
			{
				R: A2(elm$core$List$cons, a, d.R)
			});
		var selfCmd = function () {
			var _n1 = config.eQ;
			switch (_n1.$) {
				case 0:
					var offset = _n1.a;
					return d.a$ ? elm$core$Platform$Cmd$none : A2(
						jinjor$elm_debounce$Debounce$delayCmd,
						offset,
						jinjor$elm_debounce$Debounce$Flush(elm$core$Maybe$Nothing));
				case 1:
					var offset = _n1.a;
					var delay = _n1.b;
					return d.a$ ? elm$core$Platform$Cmd$none : A2(
						jinjor$elm_debounce$Debounce$delayCmd,
						offset,
						jinjor$elm_debounce$Debounce$Flush(
							elm$core$Maybe$Just(delay)));
				default:
					var delay = _n1.a;
					return A2(
						jinjor$elm_debounce$Debounce$delayCmd,
						delay,
						jinjor$elm_debounce$Debounce$SendIfLengthNotChangedFrom(
							jinjor$elm_debounce$Debounce$length(newDebounce)));
			}
		}();
		return _Utils_Tuple2(
			newDebounce,
			A2(elm$core$Platform$Cmd$map, config.e9, selfCmd));
	});
var jinjor$elm_debounce$Debounce$takeLast = F3(
	function (send, head, tail) {
		return _Utils_Tuple2(
			_List_Nil,
			send(head));
	});
var jinjor$elm_debounce$Debounce$update = F4(
	function (config, send, msg, _n0) {
		var d = _n0;
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(d, elm$core$Platform$Cmd$none);
			case 1:
				var tryAgainAfter = msg.a;
				var _n2 = d.R;
				if (_n2.b) {
					var head = _n2.a;
					var tail = _n2.b;
					var selfCmd = function () {
						if (!tryAgainAfter.$) {
							var delay = tryAgainAfter.a;
							return A2(
								jinjor$elm_debounce$Debounce$delayCmd,
								delay,
								jinjor$elm_debounce$Debounce$Flush(
									elm$core$Maybe$Just(delay)));
						} else {
							return elm$core$Platform$Cmd$none;
						}
					}();
					var _n3 = A2(send, head, tail);
					var input = _n3.a;
					var sendCmd = _n3.b;
					return _Utils_Tuple2(
						_Utils_update(
							d,
							{R: input, a$: true}),
						elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									sendCmd,
									A2(elm$core$Platform$Cmd$map, config.e9, selfCmd)
								])));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							d,
							{a$: false}),
						elm$core$Platform$Cmd$none);
				}
			default:
				var lastInputLength = msg.a;
				var _n5 = _Utils_Tuple2(
					_Utils_cmp(
						elm$core$List$length(d.R),
						lastInputLength) < 1,
					d.R);
				if (_n5.a && _n5.b.b) {
					var _n6 = _n5.b;
					var head = _n6.a;
					var tail = _n6.b;
					var _n7 = A2(send, head, tail);
					var input = _n7.a;
					var cmd = _n7.b;
					return _Utils_Tuple2(
						_Utils_update(
							d,
							{R: input}),
						cmd);
				} else {
					return _Utils_Tuple2(d, elm$core$Platform$Cmd$none);
				}
		}
	});
var ohanhi$keyboard$Keyboard$Character = function (a) {
	return {$: 0, a: a};
};
var ohanhi$keyboard$Keyboard$characterKey = function (_n0) {
	var value = _n0;
	return (elm$core$String$length(value) === 1) ? elm$core$Maybe$Just(
		ohanhi$keyboard$Keyboard$Character(value)) : elm$core$Maybe$Nothing;
};
var ohanhi$keyboard$Keyboard$Backspace = {$: 26};
var ohanhi$keyboard$Keyboard$Clear = {$: 27};
var ohanhi$keyboard$Keyboard$Copy = {$: 28};
var ohanhi$keyboard$Keyboard$CrSel = {$: 29};
var ohanhi$keyboard$Keyboard$Cut = {$: 30};
var ohanhi$keyboard$Keyboard$Delete = {$: 31};
var ohanhi$keyboard$Keyboard$EraseEof = {$: 32};
var ohanhi$keyboard$Keyboard$ExSel = {$: 33};
var ohanhi$keyboard$Keyboard$Insert = {$: 34};
var ohanhi$keyboard$Keyboard$Paste = {$: 35};
var ohanhi$keyboard$Keyboard$Redo = {$: 36};
var ohanhi$keyboard$Keyboard$Undo = {$: 37};
var ohanhi$keyboard$Keyboard$editingKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Backspace':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Backspace);
		case 'Clear':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Clear);
		case 'Copy':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Copy);
		case 'CrSel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CrSel);
		case 'Cut':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Cut);
		case 'Delete':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Delete);
		case 'EraseEof':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$EraseEof);
		case 'ExSel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ExSel);
		case 'Insert':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Insert);
		case 'Paste':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Paste);
		case 'Redo':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Redo);
		case 'Undo':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Undo);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$F1 = {$: 38};
var ohanhi$keyboard$Keyboard$F10 = {$: 47};
var ohanhi$keyboard$Keyboard$F11 = {$: 48};
var ohanhi$keyboard$Keyboard$F12 = {$: 49};
var ohanhi$keyboard$Keyboard$F13 = {$: 50};
var ohanhi$keyboard$Keyboard$F14 = {$: 51};
var ohanhi$keyboard$Keyboard$F15 = {$: 52};
var ohanhi$keyboard$Keyboard$F16 = {$: 53};
var ohanhi$keyboard$Keyboard$F17 = {$: 54};
var ohanhi$keyboard$Keyboard$F18 = {$: 55};
var ohanhi$keyboard$Keyboard$F19 = {$: 56};
var ohanhi$keyboard$Keyboard$F2 = {$: 39};
var ohanhi$keyboard$Keyboard$F3 = {$: 40};
var ohanhi$keyboard$Keyboard$F4 = {$: 41};
var ohanhi$keyboard$Keyboard$F5 = {$: 42};
var ohanhi$keyboard$Keyboard$F6 = {$: 43};
var ohanhi$keyboard$Keyboard$F7 = {$: 44};
var ohanhi$keyboard$Keyboard$F8 = {$: 45};
var ohanhi$keyboard$Keyboard$F9 = {$: 46};
var ohanhi$keyboard$Keyboard$functionKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'F1':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F1);
		case 'F2':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F2);
		case 'F3':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F3);
		case 'F4':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F4);
		case 'F5':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F5);
		case 'F6':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F6);
		case 'F7':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F7);
		case 'F8':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F8);
		case 'F9':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F9);
		case 'F10':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F10);
		case 'F11':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F11);
		case 'F12':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F12);
		case 'F13':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F13);
		case 'F14':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F14);
		case 'F15':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F15);
		case 'F16':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F16);
		case 'F17':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F17);
		case 'F18':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F18);
		case 'F19':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F19);
		case 'F20':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F20);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$ChannelDown = {$: 85};
var ohanhi$keyboard$Keyboard$ChannelUp = {$: 86};
var ohanhi$keyboard$Keyboard$MediaFastForward = {$: 87};
var ohanhi$keyboard$Keyboard$MediaPause = {$: 88};
var ohanhi$keyboard$Keyboard$MediaPlay = {$: 89};
var ohanhi$keyboard$Keyboard$MediaPlayPause = {$: 90};
var ohanhi$keyboard$Keyboard$MediaRecord = {$: 91};
var ohanhi$keyboard$Keyboard$MediaRewind = {$: 92};
var ohanhi$keyboard$Keyboard$MediaStop = {$: 93};
var ohanhi$keyboard$Keyboard$MediaTrackNext = {$: 94};
var ohanhi$keyboard$Keyboard$MediaTrackPrevious = {$: 95};
var ohanhi$keyboard$Keyboard$mediaKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'ChannelDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ChannelDown);
		case 'ChannelUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ChannelUp);
		case 'MediaFastForward':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaFastForward);
		case 'MediaPause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPause);
		case 'MediaPlay':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPlay);
		case 'MediaPlayPause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPlayPause);
		case 'MediaRecord':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaRecord);
		case 'MediaRewind':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaRewind);
		case 'MediaStop':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaStop);
		case 'MediaTrackNext':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaTrackNext);
		case 'MediaTrackPrevious':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaTrackPrevious);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Alt = {$: 1};
var ohanhi$keyboard$Keyboard$AltGraph = {$: 2};
var ohanhi$keyboard$Keyboard$CapsLock = {$: 3};
var ohanhi$keyboard$Keyboard$Fn = {$: 5};
var ohanhi$keyboard$Keyboard$FnLock = {$: 6};
var ohanhi$keyboard$Keyboard$Hyper = {$: 7};
var ohanhi$keyboard$Keyboard$Meta = {$: 8};
var ohanhi$keyboard$Keyboard$NumLock = {$: 9};
var ohanhi$keyboard$Keyboard$ScrollLock = {$: 10};
var ohanhi$keyboard$Keyboard$Shift = {$: 11};
var ohanhi$keyboard$Keyboard$Super = {$: 12};
var ohanhi$keyboard$Keyboard$Symbol = {$: 13};
var ohanhi$keyboard$Keyboard$SymbolLock = {$: 14};
var ohanhi$keyboard$Keyboard$modifierKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Alt':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Alt);
		case 'AltGraph':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$AltGraph);
		case 'CapsLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CapsLock);
		case 'Control':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Control);
		case 'Fn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Fn);
		case 'FnLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$FnLock);
		case 'Hyper':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Hyper);
		case 'Meta':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Meta);
		case 'NumLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$NumLock);
		case 'ScrollLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ScrollLock);
		case 'Shift':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Shift);
		case 'Super':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Super);
		case 'OS':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Super);
		case 'Symbol':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Symbol);
		case 'SymbolLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$SymbolLock);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$ArrowDown = {$: 18};
var ohanhi$keyboard$Keyboard$ArrowLeft = {$: 19};
var ohanhi$keyboard$Keyboard$ArrowRight = {$: 20};
var ohanhi$keyboard$Keyboard$ArrowUp = {$: 21};
var ohanhi$keyboard$Keyboard$End = {$: 22};
var ohanhi$keyboard$Keyboard$Home = {$: 23};
var ohanhi$keyboard$Keyboard$PageDown = {$: 24};
var ohanhi$keyboard$Keyboard$PageUp = {$: 25};
var ohanhi$keyboard$Keyboard$navigationKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'ArrowDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowDown);
		case 'ArrowLeft':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'ArrowRight':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowRight);
		case 'ArrowUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowUp);
		case 'Down':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowDown);
		case 'Left':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'Right':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowRight);
		case 'Up':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowUp);
		case 'End':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$End);
		case 'Home':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Home);
		case 'PageDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$PageDown);
		case 'PageUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$PageUp);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$oneOf = F2(
	function (fns, key) {
		oneOf:
		while (true) {
			if (!fns.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var fn = fns.a;
				var rest = fns.b;
				var _n1 = fn(key);
				if (!_n1.$) {
					var a = _n1.a;
					return elm$core$Maybe$Just(a);
				} else {
					var $temp$fns = rest,
						$temp$key = key;
					fns = $temp$fns;
					key = $temp$key;
					continue oneOf;
				}
			}
		}
	});
var ohanhi$keyboard$Keyboard$AppSwitch = {$: 73};
var ohanhi$keyboard$Keyboard$Call = {$: 74};
var ohanhi$keyboard$Keyboard$Camera = {$: 75};
var ohanhi$keyboard$Keyboard$CameraFocus = {$: 76};
var ohanhi$keyboard$Keyboard$EndCall = {$: 77};
var ohanhi$keyboard$Keyboard$GoBack = {$: 78};
var ohanhi$keyboard$Keyboard$GoHome = {$: 79};
var ohanhi$keyboard$Keyboard$HeadsetHook = {$: 80};
var ohanhi$keyboard$Keyboard$LastNumberRedial = {$: 81};
var ohanhi$keyboard$Keyboard$MannerMode = {$: 83};
var ohanhi$keyboard$Keyboard$Notification = {$: 82};
var ohanhi$keyboard$Keyboard$VoiceDial = {$: 84};
var ohanhi$keyboard$Keyboard$phoneKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'AppSwitch':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$AppSwitch);
		case 'Call':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Call);
		case 'Camera':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Camera);
		case 'CameraFocus':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CameraFocus);
		case 'EndCall':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$EndCall);
		case 'GoBack':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$GoBack);
		case 'GoHome':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$GoHome);
		case 'HeadsetHook':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$HeadsetHook);
		case 'LastNumberRedial':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$LastNumberRedial);
		case 'Notification':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Notification);
		case 'MannerMode':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MannerMode);
		case 'VoiceDial':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$VoiceDial);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Again = {$: 58};
var ohanhi$keyboard$Keyboard$Attn = {$: 59};
var ohanhi$keyboard$Keyboard$Cancel = {$: 60};
var ohanhi$keyboard$Keyboard$ContextMenu = {$: 61};
var ohanhi$keyboard$Keyboard$Escape = {$: 62};
var ohanhi$keyboard$Keyboard$Execute = {$: 63};
var ohanhi$keyboard$Keyboard$Find = {$: 64};
var ohanhi$keyboard$Keyboard$Finish = {$: 65};
var ohanhi$keyboard$Keyboard$Help = {$: 66};
var ohanhi$keyboard$Keyboard$Pause = {$: 67};
var ohanhi$keyboard$Keyboard$Play = {$: 68};
var ohanhi$keyboard$Keyboard$Props = {$: 69};
var ohanhi$keyboard$Keyboard$Select = {$: 70};
var ohanhi$keyboard$Keyboard$ZoomIn = {$: 71};
var ohanhi$keyboard$Keyboard$ZoomOut = {$: 72};
var ohanhi$keyboard$Keyboard$uiKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Again':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Again);
		case 'Attn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Attn);
		case 'Cancel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Cancel);
		case 'ContextMenu':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ContextMenu);
		case 'Escape':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Escape);
		case 'Execute':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Execute);
		case 'Find':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Find);
		case 'Finish':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Finish);
		case 'Help':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Help);
		case 'Pause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Pause);
		case 'Play':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Play);
		case 'Props':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Props);
		case 'Select':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Select);
		case 'ZoomIn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ZoomIn);
		case 'ZoomOut':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ZoomOut);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Enter = {$: 15};
var ohanhi$keyboard$Keyboard$Spacebar = {$: 17};
var ohanhi$keyboard$Keyboard$Tab = {$: 16};
var ohanhi$keyboard$Keyboard$whitespaceKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Enter':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Enter);
		case 'Tab':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Tab);
		case 'Spacebar':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Spacebar);
		case ' ':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Spacebar);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$anyKey = ohanhi$keyboard$Keyboard$oneOf(
	_List_fromArray(
		[ohanhi$keyboard$Keyboard$characterKey, ohanhi$keyboard$Keyboard$modifierKey, ohanhi$keyboard$Keyboard$whitespaceKey, ohanhi$keyboard$Keyboard$navigationKey, ohanhi$keyboard$Keyboard$editingKey, ohanhi$keyboard$Keyboard$functionKey, ohanhi$keyboard$Keyboard$uiKey, ohanhi$keyboard$Keyboard$phoneKey, ohanhi$keyboard$Keyboard$mediaKey]));
var ohanhi$keyboard$Keyboard$insert = F3(
	function (keyParser, rawKey, list) {
		var _n0 = keyParser(rawKey);
		if (!_n0.$) {
			var key = _n0.a;
			return A2(
				elm$core$List$cons,
				key,
				A2(
					elm$core$List$filter,
					elm$core$Basics$neq(key),
					list));
		} else {
			return list;
		}
	});
var ohanhi$keyboard$Keyboard$remove = F3(
	function (keyParser, rawKey, list) {
		var _n0 = keyParser(rawKey);
		if (!_n0.$) {
			var key = _n0.a;
			return A2(
				elm$core$List$filter,
				elm$core$Basics$neq(key),
				list);
		} else {
			return list;
		}
	});
var ohanhi$keyboard$Keyboard$updateWithParser = F3(
	function (keyParser, msg, state) {
		if (!msg.$) {
			var key = msg.a;
			return A3(ohanhi$keyboard$Keyboard$insert, keyParser, key, state);
		} else {
			var key = msg.a;
			return A3(ohanhi$keyboard$Keyboard$remove, keyParser, key, state);
		}
	});
var ohanhi$keyboard$Keyboard$update = ohanhi$keyboard$Keyboard$updateWithParser(ohanhi$keyboard$Keyboard$anyKey);
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 1:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ab: str}),
					elm$core$Platform$Cmd$none);
			case 2:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{K: str}),
					elm$core$Platform$Cmd$none);
			case 3:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aw: str}),
					elm$core$Platform$Cmd$none);
			case 4:
				var searchQueryString = msg.a;
				var message = A2(elm$core$String$endsWith, '\r', searchQueryString) ? 'EOL' : 'x';
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{e: message, aK: searchQueryString}),
					elm$core$Platform$Cmd$none);
			case 5:
				var str = msg.a;
				var currentDocument = model.a;
				var nextDocument = _Utils_update(
					currentDocument,
					{as: str});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a: nextDocument, z: true, aC: str}),
					elm$core$Platform$Cmd$none);
			case 6:
				var str = msg.a;
				var nextTags = A2(
					elm$core$List$map,
					elm$core$String$trim,
					A2(elm$core$String$split, ',', str));
				var currentDocument = model.a;
				var nextDocument = _Utils_update(
					currentDocument,
					{cg: nextTags});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a: nextDocument, z: true, bF: str}),
					elm$core$Platform$Cmd$none);
			case 7:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							e: elm$core$String$toLower(
								elm$core$String$reverse(model.e))
						}),
					elm$core$Platform$Cmd$none);
			case 17:
				if (!msg.a.$) {
					var result = msg.a.a;
					if (!result.$) {
						var token = result.a;
						var maybeToken = elm$core$Maybe$Just(token);
						var maybeCurrentUser = A2(
							author$project$User$maybeUserFromEmailAndToken,
							model.K,
							author$project$User$stringFromToken(token));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{K: '', h: maybeCurrentUser, E: maybeToken, e: 'Authorized', ab: '', aw: ''}),
							author$project$Main$sendMaybeUserDataToLocalStorage(maybeCurrentUser));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{e: 'Not authorized'}),
							elm$core$Platform$Cmd$none);
					}
				} else {
					var result = msg.a.a;
					if (!result.$) {
						var token = result.a;
						var maybeToken = elm$core$Maybe$Just(token);
						var maybeCurrentUser = A2(
							author$project$User$maybeUserFromEmailAndToken,
							model.K,
							author$project$User$stringFromToken(token));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{a: author$project$SystemDocument$newUser, K: '', h: maybeCurrentUser, E: maybeToken, e: 'Authorized', ab: '', aw: ''}),
							author$project$Main$sendMaybeUserDataToLocalStorage(maybeCurrentUser));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{e: 'Not authorized'}),
							elm$core$Platform$Cmd$none);
					}
				}
			case 18:
				switch (msg.a.$) {
					case 0:
						var result = msg.a.a;
						if (!result.$) {
							var documentRecord = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{a: documentRecord.dU, e: 'document OK'}),
								elm$core$Platform$Cmd$none);
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
					case 3:
						var result = msg.a.a;
						if (!result.$) {
							var reply = result.a;
							var idOfDocumentToDelete = A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toInt(reply));
							var documents = author$project$DocumentList$documents(model.m);
							var indexOfDocumentToDelete = A2(
								elm$core$Maybe$withDefault,
								0,
								A2(
									elm_community$list_extra$List$Extra$findIndex,
									function (doc) {
										return _Utils_eq(doc.Z, idOfDocumentToDelete);
									},
									documents));
							var maybeDocumentAboveDeleteDocument = A2(elm_community$list_extra$List$Extra$getAt, indexOfDocumentToDelete - 1, documents);
							var maybeDocumentBelowDeleteDocument = A2(elm_community$list_extra$List$Extra$getAt, indexOfDocumentToDelete + 1, documents);
							var maybeDocumentToSelect = function () {
								if (!maybeDocumentAboveDeleteDocument.$) {
									var document = maybeDocumentAboveDeleteDocument.a;
									return elm$core$Maybe$Just(document);
								} else {
									if (!maybeDocumentBelowDeleteDocument.$) {
										var document = maybeDocumentBelowDeleteDocument.a;
										return elm$core$Maybe$Just(document);
									} else {
										return elm$core$Maybe$Nothing;
									}
								}
							}();
							var nextDocumentList_ = A2(author$project$DocumentList$select, maybeDocumentToSelect, model.m);
							var documentSelectedId = function () {
								if (!maybeDocumentToSelect.$) {
									var document = maybeDocumentToSelect.a;
									return document.Z;
								} else {
									return 0;
								}
							}();
							var documentSelected = function () {
								if (!maybeDocumentToSelect.$) {
									var doc = maybeDocumentToSelect.a;
									return doc;
								} else {
									return author$project$Document$basicDocument;
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: documentSelected,
										m: A2(author$project$DocumentList$deleteItemInDocumentListAt, idOfDocumentToDelete, nextDocumentList_),
										e: 'Document deleted: ' + (elm$core$String$fromInt(indexOfDocumentToDelete) + (', Document selected: ' + elm$core$String$fromInt(documentSelectedId))),
										s: 1
									}),
								elm$core$Platform$Cmd$none);
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
					case 1:
						var result = msg.a.a;
						if (!result.$) {
							var documentRecord = result.a;
							var nextDocument = documentRecord.dU;
							var selectedDocId_ = author$project$Document$selectedDocId(nextDocument);
							var nextDocumentList_ = A3(author$project$DocumentList$nextDocumentList, selectedDocId_, nextDocument, model.m);
							var cmd = A2(
								elm$core$Platform$Cmd$map,
								author$project$Main$DocMsg,
								A4(
									author$project$Document$attachDocumentToMasterBelowCmd,
									author$project$User$getTokenStringFromMaybeUser(model.h),
									selectedDocId_,
									nextDocument,
									model.ak));
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: nextDocument,
										m: nextDocumentList_,
										e: 'selectedDocId = ' + elm$core$String$fromInt(selectedDocId_)
									}),
								cmd);
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
					default:
						var result = msg.a.a;
						if (!result.$) {
							var documentRecord = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{e: 'document saved: OK'}),
								elm$core$Platform$Cmd$none);
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
				}
			case 19:
				switch (msg.a.$) {
					case 2:
						var result = msg.a.a;
						if (!result.$) {
							var documentList = result.a;
							var currentDocumentId = model.bq.M;
							var maybeCurrentDocument = A2(
								elm_community$list_extra$List$Extra$find,
								function (doc) {
									return _Utils_eq(doc.Z, currentDocumentId);
								},
								author$project$DocumentList$documents(documentList));
							var currentDocument = A2(elm$core$Maybe$withDefault, author$project$Document$basicDocument, maybeCurrentDocument);
							var nextMaybeMasterDocument = function () {
								var _n12 = currentDocument.bY;
								if (!_n12) {
									return elm$core$Maybe$Nothing;
								} else {
									return elm$core$Maybe$Just(currentDocument);
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: currentDocument,
										m: A2(author$project$DocumentList$select, maybeCurrentDocument, documentList),
										ak: nextMaybeMasterDocument,
										e: 'documentList: ' + elm$core$String$fromInt(
											author$project$DocumentList$documentListLength(documentList))
									}),
								elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2(
											elm$core$Platform$Cmd$map,
											author$project$Main$DocDictMsg,
											A4(
												author$project$DocumentDictionary$loadTexMacros,
												author$project$User$readToken(model.E),
												currentDocument,
												currentDocument.cg,
												model.I)),
											author$project$Main$saveDocumentListToLocalStorage(documentList)
										])));
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
					case 1:
						var result = msg.a.a;
						if (!result.$) {
							var documentList = result.a;
							var idOfSelectedDocument = model.bD;
							var documents_ = author$project$DocumentList$documents(documentList);
							var indexOfSelectedDocument = A2(
								elm$core$Maybe$withDefault,
								0,
								A2(
									elm_community$list_extra$List$Extra$findIndex,
									function (doc) {
										return _Utils_eq(doc.Z, idOfSelectedDocument);
									},
									documents_));
							var selectedDocument = A2(
								elm$core$Maybe$withDefault,
								author$project$Document$basicDocument,
								A2(elm_community$list_extra$List$Extra$getAt, indexOfSelectedDocument, documents_));
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: selectedDocument,
										m: A2(
											author$project$DocumentList$select,
											elm$core$Maybe$Just(selectedDocument),
											documentList)
									}),
								elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2(
											elm$core$Platform$Cmd$map,
											author$project$Main$DocDictMsg,
											A4(
												author$project$DocumentDictionary$loadTexMacros,
												author$project$User$readToken(model.E),
												selectedDocument,
												selectedDocument.cg,
												model.I)),
											author$project$Main$saveDocumentListToLocalStorage(documentList)
										])));
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
					case 0:
						var result = msg.a.a;
						if (!result.$) {
							var documentList = result.a;
							var currentDocument = author$project$DocumentList$getFirst(documentList);
							var nextMaybeMasterDocument = function () {
								var _n15 = currentDocument.bY;
								if (!_n15) {
									return elm$core$Maybe$Nothing;
								} else {
									return elm$core$Maybe$Just(currentDocument);
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: author$project$DocumentList$getFirst(documentList),
										m: author$project$DocumentList$selectFirst(documentList),
										ak: nextMaybeMasterDocument,
										e: 'documentList: ' + elm$core$String$fromInt(
											author$project$DocumentList$documentListLength(documentList))
									}),
								elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2(
											elm$core$Platform$Cmd$map,
											author$project$Main$DocDictMsg,
											A4(
												author$project$DocumentDictionary$loadTexMacros,
												author$project$User$readToken(model.E),
												currentDocument,
												currentDocument.cg,
												model.I)),
											author$project$Main$saveDocumentListToLocalStorage(documentList)
										])));
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
					default:
						var result = msg.a.a;
						if (!result.$) {
							var documentList = result.a;
							var nextDocumentList_ = A2(
								author$project$DocumentList$select,
								elm$core$Maybe$Just(model.a),
								documentList);
							var currentDocument = author$project$DocumentList$getFirst(documentList);
							var nextMaybeMasterDocument = function () {
								var _n17 = currentDocument.bY;
								if (!_n17) {
									return elm$core$Maybe$Nothing;
								} else {
									return elm$core$Maybe$Just(currentDocument);
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										m: nextDocumentList_,
										ak: nextMaybeMasterDocument,
										e: 'documentList: ' + elm$core$String$fromInt(
											author$project$DocumentList$documentListLength(documentList))
									}),
								author$project$Main$saveDocumentListToLocalStorage(documentList));
						} else {
							var err = result.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: author$project$Main$handleHttpError(err)
									}),
								elm$core$Platform$Cmd$none);
						}
				}
			case 20:
				var document = msg.a;
				var loadMasterCommand = function () {
					var _n18 = document.bY;
					if (!_n18) {
						return elm$core$Platform$Cmd$none;
					} else {
						return A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(author$project$DocumentList$loadMasterDocument, model.h, document.Z));
					}
				}();
				var documentList = A2(
					author$project$DocumentList$select,
					elm$core$Maybe$Just(document),
					model.m);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{af: model.af + 1, a: document, z: false, D: 0, m: documentList, e: 'document: ' + document.as}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								loadMasterCommand,
								author$project$Main$saveDocToLocalStorage(document),
								author$project$Main$saveDocumentListToLocalStorage(documentList),
								A2(
								elm$core$Platform$Cmd$map,
								author$project$Main$DocDictMsg,
								A4(
									author$project$DocumentDictionary$loadTexMacros,
									author$project$User$readToken(model.E),
									document,
									document.cg,
									model.I)),
								author$project$Main$pushUrl(
								'/' + elm$core$String$fromInt(document.Z))
							])));
			case 8:
				var startupDoc = author$project$SystemDocument$signIn;
				var freshModel = A4(author$project$Main$initialModel, '', model.bJ, model.P, startupDoc);
				var basicDoc = author$project$Document$basicDocument;
				return _Utils_Tuple2(
					freshModel,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$UserMsg,
						A2(author$project$User$getTokenCmd, model.K, model.ab)));
			case 9:
				var freshModel = A4(author$project$Main$initialModel, '', model.bJ, model.P, author$project$SystemDocument$signedOut);
				return _Utils_Tuple2(
					_Utils_update(
						freshModel,
						{h: elm$core$Maybe$Nothing, E: elm$core$Maybe$Nothing}),
					author$project$Main$eraseLocalStorage);
			case 10:
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$UserMsg,
						A4(author$project$User$registerUser, model.K, model.aw, 'anon', model.ab)));
			case 11:
				var signupMode_ = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bE: signupMode_}),
					elm$core$Platform$Cmd$none);
			case 12:
				var id = msg.a;
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocMsg,
						A2(
							author$project$Document$getDocumentById,
							id,
							author$project$User$readToken(model.E))));
			case 13:
				var query = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{t: 0, e: 'query: ' + query, s: 1}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocListMsg,
						A2(
							author$project$DocumentList$findDocuments,
							elm$core$Maybe$Nothing,
							author$project$Query$parse(query))));
			case 14:
				var query = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{t: 0, e: 'query: ' + query, s: 1}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocListMsg,
						A2(author$project$DocumentList$findDocuments, elm$core$Maybe$Nothing, query)));
			case 21:
				switch (msg.a.$) {
					case 0:
						var docId = msg.a.a;
						return _Utils_Tuple2(
							model,
							A2(
								elm$core$Platform$Cmd$map,
								author$project$Main$DocListMsg,
								A2(author$project$DocumentList$loadMasterDocument, model.h, docId)));
					case 1:
						var _n19 = msg.a;
						var childId = _n19.a;
						var docId = _n19.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{bD: childId}),
							A2(
								elm$core$Platform$Cmd$map,
								author$project$Main$DocListMsg,
								A2(author$project$DocumentList$loadMasterDocumentAndSelect, model.h, docId)));
					case 2:
						var docId = msg.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{t: 0, s: 1}),
							A2(
								elm$core$Platform$Cmd$map,
								author$project$Main$DocListMsg,
								A2(author$project$DocumentList$loadMasterDocumentWithCurrentSelection, model.h, docId)));
					default:
						var query = msg.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{t: 0, e: 'query: ' + query, s: 1}),
							A2(
								elm$core$Platform$Cmd$map,
								author$project$Main$DocListMsg,
								A2(author$project$DocumentList$findDocuments, elm$core$Maybe$Nothing, query)));
				}
			case 15:
				var query = msg.a;
				var _n20 = model.h;
				if (_n20.$ === 1) {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var user = _n20.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{e: 'query: ' + query, s: 1}),
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(
								author$project$DocumentList$findDocuments,
								elm$core$Maybe$Just(user),
								author$project$Query$parse(query))));
				}
			case 16:
				var idString = msg.a;
				var _n21 = elm$core$String$toInt(idString);
				if (_n21.$ === 1) {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var id = _n21.a;
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(author$project$DocumentList$loadMasterDocument, model.h, id)));
				}
			case 22:
				var result = msg.a;
				if (!result.$) {
					var documentRecord = result.a;
					var doc = documentRecord.dU;
					var dict = model.I;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								I: A3(author$project$DocumentDictionary$put, 'texmacros', doc, dict),
								e: 'Put texmacros: ' + elm$core$String$fromInt(doc.Z)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: author$project$Main$handleHttpError(err)
							}),
						elm$core$Platform$Cmd$none);
				}
			case 23:
				var doc = author$project$Document$basicDocument;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: _Utils_update(
								doc,
								{as: 'Welcome!'})
						}),
					elm$core$Platform$Cmd$none);
			case 24:
				var _n23 = model.h;
				if (_n23.$ === 1) {
					var doc = author$project$Document$basicDocument;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								a: _Utils_update(
									doc,
									{as: 'Welcome!'})
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var user = _n23.a;
					var queryString = 'authorname=' + (author$project$User$username(user) + '&key=home');
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocListMsg,
							A2(author$project$DocumentList$findDocuments, model.h, queryString)));
				}
			case 25:
				var nextAppMode = msg.a;
				var nextToolPaneState = (!nextAppMode) ? 1 : model.s;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{t: nextAppMode, s: nextToolPaneState}),
					elm$core$Platform$Cmd$none);
			case 26:
				var msg_ = msg.a;
				var tokenString = author$project$User$getTokenStringFromMaybeUser(model.h);
				var _n24 = A4(
					jinjor$elm_debounce$Debounce$update,
					author$project$Main$debounceConfig,
					jinjor$elm_debounce$Debounce$takeLast(author$project$Main$updateEditorContentCmd),
					msg_,
					model.aB);
				var debounce = _n24.a;
				var cmd = _n24.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aB: debounce, aT: model.aT + 1}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								cmd,
								author$project$Main$saveDocToLocalStorage(model.a)
							])));
			case 27:
				var str = msg.a;
				var _n25 = A3(jinjor$elm_debounce$Debounce$push, author$project$Main$debounceConfig, str, model.aB);
				var debounce = _n25.a;
				var cmd = _n25.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{z: true, aB: debounce, ce: str}),
					cmd);
			case 28:
				var str = msg.a;
				var currentDocument = model.a;
				var nextCurrentDocument = _Utils_update(
					currentDocument,
					{az: str});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a: nextCurrentDocument}),
					elm$core$Platform$Cmd$none);
			case 29:
				var time = msg.a;
				var tokenString = author$project$User$getTokenStringFromMaybeUser(model.h);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							z: false,
							e: 'Saved document: ' + elm$core$String$fromInt(model.a.Z)
						}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocMsg,
						A2(author$project$Document$saveDocument, tokenString, model.a)));
			case 30:
				return author$project$Main$saveCurrentDocument(model);
			case 31:
				var infoForElm_ = msg.a;
				return A2(author$project$Main$processInfoForElm, model, infoForElm_);
			case 33:
				var nextToolPanelState = function () {
					var _n27 = model.s;
					if (_n27 === 1) {
						return 0;
					} else {
						return 1;
					}
				}();
				var nextModel = function () {
					if (nextToolPanelState === 1) {
						return _Utils_update(
							model,
							{s: nextToolPanelState});
					} else {
						return _Utils_update(
							model,
							{D: 0, aC: model.a.as, s: nextToolPanelState});
					}
				}();
				return _Utils_Tuple2(nextModel, elm$core$Platform$Cmd$none);
			case 34:
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocMsg,
						author$project$Main$newDocument(model)));
			case 35:
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocMsg,
						author$project$Main$newChildDocument(model)));
			case 36:
				var textType = msg.a;
				var document = model.a;
				var nextDocument = _Utils_update(
					document,
					{ch: textType});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a: nextDocument, z: true}),
					elm$core$Platform$Cmd$none);
			case 37:
				var docType = msg.a;
				var document = model.a;
				var nextDocument = _Utils_update(
					document,
					{bY: docType});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a: nextDocument, z: true}),
					elm$core$Platform$Cmd$none);
			case 38:
				var viewport = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							b4: elm$core$Maybe$Just(viewport)
						}),
					elm$core$Platform$Cmd$none);
			case 39:
				var tokenString = author$project$User$getTokenStringFromMaybeUser(model.h);
				var _n28 = model.D;
				if (!_n28) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{D: 1}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{D: 0}),
						A2(
							elm$core$Platform$Cmd$map,
							author$project$Main$DocMsg,
							A2(author$project$Document$deleteDocument, tokenString, model.a)));
				}
			case 40:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{D: 0}),
					elm$core$Platform$Cmd$none);
			case 32:
				var error = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{e: 'Error: ' + error}),
					elm$core$Platform$Cmd$none);
			case 41:
				var keyMsg = msg.a;
				var pressedKeys = A2(ohanhi$keyboard$Keyboard$update, keyMsg, model.ca);
				return A2(author$project$Main$keyGatweway, model, pressedKeys);
			case 42:
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Main$DocMsg,
						A2(author$project$Document$getDocumentById, author$project$Configuration$userManualId, elm$core$Maybe$Nothing)));
			default:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{e: 'Url: ' + str}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Main$NewChildDocument = {$: 35};
var mdgriffith$stylish_elephants$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$rgb = F3(
	function (r, g, b) {
		return A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, r, g, b, 1);
	});
var author$project$Widget$blue = A3(mdgriffith$stylish_elephants$Element$rgb, 0.3, 0.3, 0.5);
var author$project$Widget$mouseDownColor = A3(mdgriffith$stylish_elephants$Element$rgb, 0.7, 0.1, 0.1);
var author$project$Widget$white = A3(mdgriffith$stylish_elephants$Element$rgb, 1.0, 1.0, 1.0);
var mdgriffith$stylish_elephants$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var mdgriffith$stylish_elephants$Element$height = mdgriffith$stylish_elephants$Internal$Model$Height;
var mdgriffith$stylish_elephants$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Flag$flag = function (i) {
	return (i > 31) ? mdgriffith$stylish_elephants$Internal$Flag$Second(1 << (i - 32)) : mdgriffith$stylish_elephants$Internal$Flag$Flag(1 << i);
};
var mdgriffith$stylish_elephants$Internal$Flag$active = mdgriffith$stylish_elephants$Internal$Flag$flag(32);
var mdgriffith$stylish_elephants$Internal$Model$Active = 2;
var mdgriffith$stylish_elephants$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$tag = F2(
	function (label, style) {
		switch (style.$) {
			case 3:
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(mdgriffith$stylish_elephants$Internal$Model$Single, label + ('-' + _class), prop, val);
			case 4:
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(mdgriffith$stylish_elephants$Internal$Model$Colored, label + ('-' + _class), prop, val);
			case 0:
				var _class = style.a;
				var props = style.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Style, label + ('-' + _class), props);
			case 11:
				var _class = style.a;
				var o = style.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, label + ('-' + _class), o);
			default:
				var x = style;
				return x;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Shadows = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var elm$core$String$fromFloat = _String_fromNumber;
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$core$Basics$round = _Basics_round;
var mdgriffith$stylish_elephants$Internal$Model$floatClass = function (x) {
	return elm$core$String$fromInt(
		elm$core$Basics$round(x * 255));
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
				shadow.b0 ? 'box-inset' : 'box-',
				elm$core$String$fromFloat(shadow.c.a) + 'px',
				elm$core$String$fromFloat(shadow.c.b) + 'px',
				elm$core$String$fromFloat(shadow.W) + 'px',
				elm$core$String$fromFloat(shadow.ad) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColorClass(shadow.X)
			]));
};
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
					shadow.b0 ? elm$core$Maybe$Just('inset') : elm$core$Maybe$Nothing,
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.c.a) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.c.b) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.W) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.ad) + 'px'),
					elm$core$Maybe$Just(
					mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.X))
				])));
};
var mdgriffith$stylish_elephants$Internal$Model$formatTextShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				elm$core$String$fromFloat(shadow.c.a) + 'px',
				elm$core$String$fromFloat(shadow.c.b) + 'px',
				elm$core$String$fromFloat(shadow.W) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.X)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$textShadowName = function (shadow) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				'txt',
				elm$core$String$fromFloat(shadow.c.a) + 'px',
				elm$core$String$fromFloat(shadow.c.b) + 'px',
				elm$core$String$fromFloat(shadow.W) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.X)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$onlyStyles = function (attr) {
	switch (attr.$) {
		case 4:
			var style = attr.b;
			return elm$core$Maybe$Just(style);
		case 10:
			var shadow = attr.a;
			var stringName = mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow);
			return elm$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$Shadows,
					'txt-shadow-' + mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow),
					stringName));
		case 11:
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
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var mdgriffith$stylish_elephants$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$BoxShadow = function (a) {
	return {$: 11, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$NoAttribute = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$TextShadow = function (a) {
	return {$: 10, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var mdgriffith$stylish_elephants$Internal$Model$Empty = {$: 3};
var mdgriffith$stylish_elephants$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 1:
				var styled = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Styled(
					{
						d5: F2(
							function (add, context) {
								return A2(
									elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.d5, add, context));
							}),
						eS: styled.eS
					});
			case 0:
				var html = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A2(
						elm$core$Basics$composeL,
						elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 2:
				var str = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Text(str);
			default:
				return mdgriffith$stylish_elephants$Internal$Model$Empty;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 0:
				return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
			case 2:
				var description = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Describe(description);
			case 6:
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$AlignX(x);
			case 5:
				var y = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$AlignY(y);
			case 7:
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Width(x);
			case 8:
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Height(x);
			case 3:
				var x = attr.a;
				var y = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Class, x, y);
			case 4:
				var flag = attr.a;
				var style = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$StyleClass, flag, style);
			case 9:
				var location = attr.a;
				var elem = attr.b;
				return A2(
					mdgriffith$stylish_elephants$Internal$Model$Nearby,
					location,
					A2(mdgriffith$stylish_elephants$Internal$Model$map, fn, elem));
			case 1:
				var htmlAttr = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Attr(
					A2(elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			case 10:
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
			if (x.$ === 12) {
				var name = x.a;
				var shadowProps = x.b;
				var _n3 = styles.a7;
				if (_n3.$ === 1) {
					return _Utils_update(
						styles,
						{
							a7: elm$core$Maybe$Just(
								_Utils_Tuple2(name, shadowProps))
						});
				} else {
					var _n4 = _n3.a;
					var existingName = _n4.a;
					var existingShadow = _n4.b;
					return _Utils_update(
						styles,
						{
							a7: elm$core$Maybe$Just(
								_Utils_Tuple2(
									_Utils_ap(existingName, name),
									existingShadow + (', ' + shadowProps)))
						});
				}
			} else {
				return _Utils_update(
					styles,
					{
						eS: A2(elm$core$List$cons, x, styles.eS)
					});
			}
		});
	var addShadow = function (styles) {
		var _n0 = styles.a7;
		if (_n0.$ === 1) {
			return styles.eS;
		} else {
			var _n1 = _n0.a;
			var shadowName = _n1.a;
			var shadowProps = _n1.b;
			return A2(
				elm$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, shadowName, shadowProps),
				styles.eS);
		}
	};
	return addShadow(
		A3(
			elm$core$List$foldr,
			joinShadows,
			{a7: elm$core$Maybe$Nothing, eS: _List_Nil},
			A2(
				elm$core$List$filterMap,
				A2(elm$core$Basics$composeL, mdgriffith$stylish_elephants$Internal$Model$onlyStyles, mdgriffith$stylish_elephants$Internal$Model$removeNever),
				attrs)));
};
var mdgriffith$stylish_elephants$Internal$Style$classes = {dj: 'a', dk: 'atv', dm: 'ab', dn: 'cx', $7: 'cy', dp: 'acb', dq: 'accx', dr: 'accy', ds: 'acr', cm: 'al', cn: 'ar', dt: 'at', bM: 'ah', bN: 'av', du: 's', dy: 'bh', dz: 'b', dA: 'w7', dC: 'bd', dD: 'bdt', bi: 'bn', dE: 'bs', bj: 'cpe', dL: 'cp', dM: 'cpx', dN: 'cpy', Y: 'c', bm: 'cr', bn: 'cb', aS: 'ccx', aA: 'ccy', cx: 'cl', bo: 'cr', dP: 'ct', dR: 'cptr', dS: 'ctxt', d_: 'fcs', d0: 'g', aX: 'hc', cH: 'hf', d1: 'hfp', d4: 'hv', d8: 'fr', eb: 'iml', ec: 'it', ee: 'i', el: 'notxt', en: 'ol', ep: 'or', an: 'oq', by: 'oh', cW: 'pg', cX: 'p', et: 'ppe', eB: 'se', c4: 'r', eD: 'sb', eE: 'sbx', eF: 'sby', eG: 'sb', eJ: 'e', eL: 'se', eR: 'sk', ar: 't', eV: 'tc', eW: 'w8', eX: 'w2', eY: 'w9', eZ: 'tj', bG: 'tja', e_: 'tl', e$: 'w3', e0: 'w5', e1: 'w4', e2: 'tr', e3: 'w6', e4: 'w1', e5: 'tun', fa: 'ts', au: 'clr', fb: 'u', dg: 'wc', fe: 'we', dh: 'wf', ff: 'wfp'};
var mdgriffith$stylish_elephants$Element$mouseDown = function (decs) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$active,
		A2(
			mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
			2,
			A2(
				elm$core$List$map,
				mdgriffith$stylish_elephants$Internal$Model$tag(mdgriffith$stylish_elephants$Internal$Style$classes.dk),
				mdgriffith$stylish_elephants$Internal$Model$unwrapDecorations(decs))));
};
var mdgriffith$stylish_elephants$Internal$Flag$padding = mdgriffith$stylish_elephants$Internal$Flag$flag(2);
var mdgriffith$stylish_elephants$Internal$Model$PaddingStyle = F4(
	function (a, b, c, d) {
		return {$: 6, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$paddingXY = F2(
	function (x, y) {
		return A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$padding,
			A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, y, x, y, x));
	});
var mdgriffith$stylish_elephants$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Element$px = mdgriffith$stylish_elephants$Internal$Model$Px;
var mdgriffith$stylish_elephants$Element$width = mdgriffith$stylish_elephants$Internal$Model$Width;
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
var mdgriffith$stylish_elephants$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Element$Font$size = function (i) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontSize,
		mdgriffith$stylish_elephants$Internal$Model$FontSize(i));
};
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
var mdgriffith$stylish_elephants$Element$text = function (content) {
	return mdgriffith$stylish_elephants$Internal$Model$Text(content);
};
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
var mdgriffith$stylish_elephants$Element$pointer = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$cursor, mdgriffith$stylish_elephants$Internal$Style$classes.dR);
var mdgriffith$stylish_elephants$Internal$Model$Content = {$: 1};
var mdgriffith$stylish_elephants$Element$shrink = mdgriffith$stylish_elephants$Internal$Model$Content;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
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
	if (((attr.$ === 4) && (attr.b.$ === 10)) && (!attr.b.a)) {
		var _n1 = attr.b;
		var _n2 = _n1.a;
		return true;
	} else {
		return false;
	}
};
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var mdgriffith$stylish_elephants$Internal$Model$htmlClass = function (cls) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(
			elm$virtual_dom$VirtualDom$property,
			'className',
			elm$json$Json$Encode$string(cls)));
};
var mdgriffith$stylish_elephants$Element$Input$focusDefault = function (attrs) {
	return A2(elm$core$List$any, mdgriffith$stylish_elephants$Element$Input$hasFocusStyle, attrs) ? mdgriffith$stylish_elephants$Internal$Model$NoAttribute : mdgriffith$stylish_elephants$Internal$Model$htmlClass('focusable');
};
var mdgriffith$stylish_elephants$Element$Input$enter = 'Enter';
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
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
var mdgriffith$stylish_elephants$Internal$Model$Button = {$: 8};
var mdgriffith$stylish_elephants$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsEl = 2;
var mdgriffith$stylish_elephants$Internal$Model$asEl = 2;
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var mdgriffith$stylish_elephants$Internal$Flag$heightContent = mdgriffith$stylish_elephants$Internal$Flag$flag(36);
var mdgriffith$stylish_elephants$Internal$Flag$present = F2(
	function (myFlag, _n0) {
		var fieldOne = _n0.a;
		var fieldTwo = _n0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$widthContent = mdgriffith$stylish_elephants$Internal$Flag$flag(38);
var mdgriffith$stylish_elephants$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$addWhen = F3(
	function (ifThis, x, to) {
		return ifThis ? A2(elm$core$List$cons, x, to) : to;
	});
var mdgriffith$stylish_elephants$Internal$Model$AllowHover = 1;
var mdgriffith$stylish_elephants$Internal$Model$Layout = 1;
var mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle = {
	dx: elm$core$Maybe$Nothing,
	dB: elm$core$Maybe$Nothing,
	eH: elm$core$Maybe$Just(
		{
			W: 3,
			X: A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			c: _Utils_Tuple2(0, 0),
			ad: 3
		})
};
var mdgriffith$stylish_elephants$Internal$Model$defaultOptions = {d_: mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle, d4: 1, ej: 1};
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var mdgriffith$stylish_elephants$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return elm$core$String$fromInt(i) + 'fr';
		case 3:
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
	switch (_class) {
		case 0:
			return 'focus';
		case 1:
			return 'hover';
		default:
			return 'active';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 12:
			var name = style.a;
			return name;
		case 11:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var x = style.a;
			var y = style.b;
			return 'spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
		case 6:
			var top = style.a;
			var right = style.b;
			var bottom = style.c;
			var left = style.d;
			return 'pad-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + ('-' + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))));
		case 7:
			var template = style.a;
			return 'grid-rows-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.eC)) + ('-cols-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.C)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.eM.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.eM.b)))))));
		case 8:
			var pos = style.a;
			return 'gp grid-pos-' + (elm$core$String$fromInt(pos.c4) + ('-' + (elm$core$String$fromInt(pos.cw) + ('-' + (elm$core$String$fromInt(pos.cj) + ('-' + elm$core$String$fromInt(pos.b$)))))));
		case 10:
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
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
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
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$dot = function (c) {
	return '.' + c;
};
var mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle = function (focus) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$Style,
		mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du) + (':focus .focusable, ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du) + '.focusable:focus')),
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
					focus.dB),
					A2(
					elm$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'background-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.dx),
					A2(
					elm$core$Maybe$map,
					function (shadow) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'box-shadow',
							mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(
								{
									W: shadow.W,
									X: shadow.X,
									b0: false,
									c: A2(
										elm$core$Tuple$mapSecond,
										elm$core$Basics$toFloat,
										A2(elm$core$Tuple$mapFirst, elm$core$Basics$toFloat, shadow.c)),
									ad: shadow.ad
								}));
					},
					focus.eH),
					elm$core$Maybe$Just(
					A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'outline', 'none'))
				])));
};
var elm$core$Basics$not = _Basics_not;
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
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
		var attributes = _n0.b;
		var node = _n0.q;
		var has = _n0.d;
		var createNode = F3(
			function (nodeName, attrs, withStyles) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 1) {
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
							if (withStyles.$ === 1) {
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
				case 0:
					return A3(createNode, 'div', attributes, styles);
				case 1:
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
										mdgriffith$stylish_elephants$Internal$Model$vDomClass(mdgriffith$stylish_elephants$Internal$Style$classes.du + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.eJ))
									]),
								styles)
							]));
			}
		}();
		switch (context) {
			case 0:
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
									[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.bm, mdgriffith$stylish_elephants$Internal$Style$classes.aA, mdgriffith$stylish_elephants$Internal$Style$classes.ds])))
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
									[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.bm, mdgriffith$stylish_elephants$Internal$Style$classes.aA, mdgriffith$stylish_elephants$Internal$Style$classes.dq])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
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
									[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.bm, mdgriffith$stylish_elephants$Internal$Style$classes.dr])))
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
									[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.bm, mdgriffith$stylish_elephants$Internal$Style$classes.dp])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var mdgriffith$stylish_elephants$Internal$Style$Batch = function (a) {
	return {$: 5, a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Left = 3;
var mdgriffith$stylish_elephants$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Right = 2;
var mdgriffith$stylish_elephants$Internal$Style$Self = elm$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Content = elm$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$Bottom = 1;
var mdgriffith$stylish_elephants$Internal$Style$CenterX = 4;
var mdgriffith$stylish_elephants$Internal$Style$CenterY = 5;
var mdgriffith$stylish_elephants$Internal$Style$Top = 0;
var mdgriffith$stylish_elephants$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var mdgriffith$stylish_elephants$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _n1 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dP);
		case 1:
			var _n2 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bn);
		case 2:
			var _n3 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bo);
		case 3:
			var _n4 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cx);
		case 4:
			var _n5 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aS);
		default:
			var _n6 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aA);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _n1 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dt);
		case 1:
			var _n2 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dm);
		case 2:
			var _n3 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cn);
		case 3:
			var _n4 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cm);
		case 4:
			var _n5 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dn);
		default:
			var _n6 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.$7);
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
				mdgriffith$stylish_elephants$Internal$Style$contentName(alignment),
				content),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(alignment),
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
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return mdgriffith$stylish_elephants$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$Above = 0;
var mdgriffith$stylish_elephants$Internal$Style$Behind = 5;
var mdgriffith$stylish_elephants$Internal$Style$Below = 1;
var mdgriffith$stylish_elephants$Internal$Style$OnLeft = 3;
var mdgriffith$stylish_elephants$Internal$Style$OnRight = 2;
var mdgriffith$stylish_elephants$Internal$Style$Within = 4;
var mdgriffith$stylish_elephants$Internal$Style$locations = function () {
	var loc = 0;
	var _n0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var mdgriffith$stylish_elephants$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du) + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c4) + (' > ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du) + (' { flex-basis: auto !important; } ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du) + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c4) + (' > ' + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du) + (mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bm) + ' { flex-basis: auto !important; }}'))))))))));
var mdgriffith$stylish_elephants$Internal$Style$Intermediate = elm$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {bl: closing, v: _List_Nil, ac: _List_Nil, T: selector};
	});
var mdgriffith$stylish_elephants$Internal$Style$renderRules = F2(
	function (_n0, rulesToRender) {
		var parent = _n0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								ac: A2(
									elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.ac)
							});
					case 2:
						var _n2 = rule.a;
						var prop = _n2.a;
						var value = _n2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								v: A2(
									elm$core$List$cons,
									{bl: '\n}', v: _List_Nil, ac: props, T: '@supports (' + (prop + (':' + (value + (') {' + parent.T))))},
									rendered.v)
							});
					case 4:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								v: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.T + (' + ' + selector), ''),
										adjRules),
									rendered.v)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								v: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.T + (' > ' + child), ''),
										childRules),
									rendered.v)
							});
					case 3:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								v: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(
											mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.T, descriptor),
											''),
										descriptorRules),
									rendered.v)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								v: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.T, ''),
										batched),
									rendered.v)
							});
				}
			});
		return A3(elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
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
		var _n2 = rule.ac;
		if (!_n2.b) {
			return '';
		} else {
			return rule.T + ('{' + (renderValues(rule.ac) + (rule.bl + '}')));
		}
	};
	var renderIntermediate = function (_n0) {
		var rule = _n0;
		return _Utils_ap(
			renderClass(rule),
			elm$core$String$concat(
				A2(elm$core$List$map, renderIntermediate, rule.v)));
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
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du) + ':focus',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'outline', 'none')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eB),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'min-height', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '0'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						_Utils_ap(
							mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
							mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH)),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Child,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d8),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'fixed')
									]))
							]))
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.el),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-moz-user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-webkit-user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'user-select', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dR),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'pointer')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dS),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'text')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.et),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none !important')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bj),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto !important')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.au),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.an),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.d4, mdgriffith$stylish_elephants$Internal$Style$classes.au)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.d4, mdgriffith$stylish_elephants$Internal$Style$classes.an)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.d_, mdgriffith$stylish_elephants$Internal$Style$classes.au)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.d_, mdgriffith$stylish_elephants$Internal$Style$classes.an)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.dk, mdgriffith$stylish_elephants$Internal$Style$classes.au)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.dk, mdgriffith$stylish_elephants$Internal$Style$classes.an)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.fa),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.by),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-overflow-style', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eD),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eE),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c4),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eF),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.Y),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eJ),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dL),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dM),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dN),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dg),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', 'auto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bi),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dC),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dashed')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dD),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dotted')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dE),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ar),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-block')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ec),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'line-height', '1.05')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eJ),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eG),
								_List_fromArray(
									[
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ar),
										_List_fromArray(
											[
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
													])),
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dh),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'auto !important')
													]))
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aX),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dh),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dg),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
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
										case 1:
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
										case 2:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 3:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 4:
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
														mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c4),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', '0%'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.fe),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d1),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dh),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bm),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.ds,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.dq,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dn),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-left', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.dq,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dn),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-right', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.dq,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.$7),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.dq + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.ds + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.dq)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 1:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 2:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_Nil);
										case 3:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_Nil);
										case 4:
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
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eL),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.Y),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dh),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ff),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dg),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.dp,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.dr,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.$7),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.dr,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.$7),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.dr,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.$7),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.dr + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.dp + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.dr)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto')
													]));
										case 1:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto')
													]));
										case 2:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 3:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 4:
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
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bm),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eL),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d0),
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
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
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
									switch (alignment) {
										case 0:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
												]);
										case 1:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
												]);
										case 2:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
												]);
										case 3:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
												]);
										case 4:
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cW),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du + ':first-child'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.du + (mdgriffith$stylish_elephants$Internal$Style$selfName(3) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.du))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.du + (mdgriffith$stylish_elephants$Internal$Style$selfName(2) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.du))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 1:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 2:
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
										case 3:
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
										case 4:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eb),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre-wrap')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ar),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eJ),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d8),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dy),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dj),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dz),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ep),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.en),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ar),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c4),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.Y),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d0),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-grid')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 1:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 2:
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'right')
													]));
										case 3:
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'left')
													]));
										case 4:
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
								switch (loc) {
									case 0:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dj),
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
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														])),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dh),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
														])),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									case 1:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dz),
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
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														]))
												]));
									case 2:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ep),
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
									case 3:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.en),
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
									case 4:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d8),
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
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									default:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dy),
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
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
								}
							})),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e4),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '100')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '200')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e$),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '300')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e1),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '400')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e0),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '500')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e3),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '600')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dA),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '700')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eW),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '800')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eY),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '900')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ee),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'italic')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eR),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'line-through')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.fb),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'underline'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip', 'ink')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e5),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'normal')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eZ),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bG),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify-all')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eV),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'center')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e2),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'right')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.e_),
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
							[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.ar, mdgriffith$stylish_elephants$Internal$Style$classes.dg, mdgriffith$stylish_elephants$Internal$Style$classes.aX]))))
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
							[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.ar, mdgriffith$stylish_elephants$Internal$Style$classes.dh, mdgriffith$stylish_elephants$Internal$Style$classes.cH]))))
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
var mdgriffith$stylish_elephants$Internal$Model$Focus = 0;
var mdgriffith$stylish_elephants$Internal$Model$Hover = 1;
var mdgriffith$stylish_elephants$Internal$Model$renderFont = function (families) {
	var fontName = function (font) {
		switch (font.$) {
			case 0:
				return 'serif';
			case 1:
				return 'sans-serif';
			case 2:
				return 'monospace';
			case 3:
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
			if (rule.$ === 1) {
				var name = rule.a;
				var typefaces = rule.b;
				var getImports = function (font) {
					if (font.$ === 4) {
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
				if (maybePseudo.$ === 1) {
					return selector + ('{' + (A3(
						elm$core$List$foldl,
						renderProps(force),
						'',
						props) + '\n}'));
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo) {
						case 1:
							return selector + (':hover {' + (A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
						case 0:
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
					case 0:
						var selector = rule.a;
						var props = rule.b;
						return A4(renderStyle, force, maybePseudo, selector, props);
					case 12:
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
					case 11:
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
					case 2:
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
					case 1:
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
					case 3:
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
					case 4:
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
					case 5:
						var x = rule.a;
						var y = rule.b;
						var yPx = elm$core$String$fromInt(y) + 'px';
						var xPx = elm$core$String$fromInt(x) + 'px';
						var row = '.' + function ($) {
							return $.c4;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var right = '.' + function ($) {
							return $.cn;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var paragraph = '.' + function ($) {
							return $.cX;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var page = '.' + function ($) {
							return $.cW;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var left = '.' + function ($) {
							return $.cm;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var column = '.' + function ($) {
							return $.Y;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var _class = '.spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
						var any = '.' + function ($) {
							return $.du;
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
					case 6:
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
					case 7:
						var template = rule.a;
						var toGridLengthHelper = F3(
							function (minimum, maximum, x) {
								switch (x.$) {
									case 0:
										var px = x.a;
										return elm$core$String$fromInt(px) + 'px';
									case 1:
										var _n2 = _Utils_Tuple2(minimum, maximum);
										if (_n2.a.$ === 1) {
											if (_n2.b.$ === 1) {
												var _n3 = _n2.a;
												var _n4 = _n2.b;
												return 'max-content';
											} else {
												var _n6 = _n2.a;
												var maxSize = _n2.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n2.b.$ === 1) {
												var minSize = _n2.a.a;
												var _n5 = _n2.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
											} else {
												var minSize = _n2.a.a;
												var maxSize = _n2.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 2:
										var i = x.a;
										var _n7 = _Utils_Tuple2(minimum, maximum);
										if (_n7.a.$ === 1) {
											if (_n7.b.$ === 1) {
												var _n8 = _n7.a;
												var _n9 = _n7.b;
												return elm$core$String$fromInt(i) + 'fr';
											} else {
												var _n11 = _n7.a;
												var maxSize = _n7.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n7.b.$ === 1) {
												var minSize = _n7.a.a;
												var _n10 = _n7.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
											} else {
												var minSize = _n7.a.a;
												var maxSize = _n7.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 3:
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
						var xSpacing = toGridLength(template.eM.a);
						var ySpacing = toGridLength(template.eM.b);
						var rows = function (x) {
							return 'grid-template-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.eC)));
						var msRows = function (x) {
							return '-ms-grid-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.C)));
						var msColumns = function (x) {
							return '-ms-grid-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.C)));
						var gapY = 'grid-row-gap:' + (toGridLength(template.eM.b) + ';');
						var gapX = 'grid-column-gap:' + (toGridLength(template.eM.a) + ';');
						var columns = function (x) {
							return 'grid-template-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.C)));
						var _class = '.grid-rows-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.eC)) + ('-cols-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.C)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.eM.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.eM.b)))))));
						var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msColumns + (msRows + '}')));
						return _Utils_ap(base, supports);
					case 8:
						var position = rule.a;
						var msPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'-ms-grid-row: ' + (elm$core$String$fromInt(position.c4) + ';'),
									'-ms-grid-row-span: ' + (elm$core$String$fromInt(position.b$) + ';'),
									'-ms-grid-column: ' + (elm$core$String$fromInt(position.cw) + ';'),
									'-ms-grid-column-span: ' + (elm$core$String$fromInt(position.cj) + ';')
								]));
						var modernPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'grid-row: ' + (elm$core$String$fromInt(position.c4) + (' / ' + (elm$core$String$fromInt(position.c4 + position.b$) + ';'))),
									'grid-column: ' + (elm$core$String$fromInt(position.cw) + (' / ' + (elm$core$String$fromInt(position.cw + position.cj) + ';')))
								]));
						var _class = '.grid-pos-' + (elm$core$String$fromInt(position.c4) + ('-' + (elm$core$String$fromInt(position.cw) + ('-' + (elm$core$String$fromInt(position.cj) + ('-' + elm$core$String$fromInt(position.b$)))))));
						var modernGrid = _class + ('{' + (modernPosition + '}'));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msPosition + '}'));
						return _Utils_ap(base, supports);
					case 10:
						var _class = rule.a;
						var styles = rule.b;
						var renderPseudoRule = function (style) {
							switch (_class) {
								case 0:
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(0),
										false);
								case 2:
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(2),
										false);
								default:
									var _n13 = options.d4;
									switch (_n13) {
										case 0:
											return '';
										case 1:
											return A3(
												renderStyleRule,
												style,
												elm$core$Maybe$Just(1),
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
						bC: _Utils_ap(
							rendered.bC,
							A3(renderStyleRule, style, elm$core$Maybe$Nothing, false)),
						bc: function () {
							var _n15 = renderTopLevels(style);
							if (_n15.$ === 1) {
								return rendered.bc;
							} else {
								var topLevel = _n15.a;
								return _Utils_ap(rendered.bc, topLevel);
							}
						}()
					});
			});
		return function (_n14) {
			var rules = _n14.bC;
			var topLevel = _n14.bc;
			return _Utils_ap(topLevel, rules);
		}(
			A3(
				elm$core$List$foldl,
				combine,
				{bC: '', bc: ''},
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
					case 0:
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.d5, elm$core$Maybe$Nothing, context)),
								htmls),
							_Utils_ap(styled.eS, existingStyles));
					case 2:
						var str = child.a;
						return (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthContent, rendered.d) && (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightContent, rendered.d) && _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl))) ? _Utils_Tuple2(
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
					case 0:
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								A2(styled.d5, elm$core$Maybe$Nothing, context),
								htmls),
							_Utils_ap(styled.eS, existingStyles));
					case 2:
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
			if (children.$ === 1) {
				var keyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Keyed,
					A3(
						elm$core$List$foldr,
						gatherKeyed,
						_Utils_Tuple2(_List_Nil, rendered.eS),
						keyedChildren));
			} else {
				var unkeyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed,
					A3(
						elm$core$List$foldr,
						gather,
						_Utils_Tuple2(_List_Nil, rendered.eS),
						unkeyedChildren));
			}
		}();
		var htmlChildren = _n0.a;
		var styleChildren = _n0.b;
		var _n2 = function () {
			switch (embedMode.$) {
				case 0:
					return _Utils_Tuple3(false, false, mdgriffith$stylish_elephants$Internal$Model$defaultOptions);
				case 1:
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
			if (!embedMode.$) {
				return _List_Nil;
			} else {
				return A3(
					elm$core$List$foldl,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.d_)
							])),
					styleChildren).b;
			}
		}();
		var renderedChildren = function () {
			if (htmlChildren.$ === 1) {
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
									rendered.cu),
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
							_Utils_ap(rendered.cu, unkeyed))));
			}
		}();
		if (!embedMode.$) {
			if (!styleChildren.b) {
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
			} else {
				return mdgriffith$stylish_elephants$Internal$Model$Styled(
					{
						d5: A2(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren),
						eS: styleChildren
					});
			}
		} else {
			return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
				A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.du + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.c4));
		case 1:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.du + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.Y));
		case 2:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.du + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.eJ));
		case 3:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.du + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.d0));
		case 4:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.du + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.cX));
		default:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.du + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.cW));
	}
};
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
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
			group.at);
		var scale = A2(
			elm$core$Maybe$map,
			function (_n8) {
				var x = _n8.a;
				var y = _n8.b;
				var z = _n8.c;
				return 'scale3d(' + (elm$core$String$fromFloat(x) + (', ' + (elm$core$String$fromFloat(y) + (', ' + (elm$core$String$fromFloat(z) + ')')))));
			},
			group.aJ);
		var rotate = A2(
			elm$core$Maybe$map,
			function (_n7) {
				var x = _n7.a;
				var y = _n7.b;
				var z = _n7.c;
				var angle = _n7.d;
				return 'rotate3d(' + (elm$core$String$fromFloat(x) + (',' + (elm$core$String$fromFloat(y) + (',' + (elm$core$String$fromFloat(z) + (',' + (elm$core$String$fromFloat(angle) + 'rad)')))))));
			},
			group.aI);
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
						group.at),
						A2(
						elm$core$Maybe$map,
						function (_n5) {
							var x = _n5.a;
							var y = _n5.b;
							var z = _n5.c;
							return 'scale' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(z)))));
						},
						group.aJ),
						A2(
						elm$core$Maybe$map,
						function (_n6) {
							var x = _n6.a;
							var y = _n6.b;
							var z = _n6.c;
							var angle = _n6.d;
							return 'rotate-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(z) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(angle)))))));
						},
						group.aI)
					])));
		if (!transformations.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var trans = transformations;
			var transforms = A2(elm$core$String$join, ' ', trans);
			var _n1 = function () {
				if (maybePseudo.$ === 1) {
					return _Utils_Tuple2('transform-' + name, '.transform-' + name);
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo) {
						case 1:
							return _Utils_Tuple2('transform-' + (name + '-hover'), '.transform-' + (name + '-hover:hover'));
						case 0:
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
		var _n9 = gathered.aN;
		if (_n9.$ === 1) {
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
		var _n6 = gathered.ay;
		if (_n6.$ === 1) {
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
			if (_new.$ === 1) {
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
		var _n1 = gathered.e9;
		if (_n1.$ === 1) {
			return _Utils_Tuple2(classes, styles);
		} else {
			var transform = _n1.a;
			return A2(
				add,
				A2(
					elm$core$Maybe$andThen,
					mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
						elm$core$Maybe$Just(2)),
					transform.dk),
				A2(
					add,
					A2(
						elm$core$Maybe$andThen,
						mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
							elm$core$Maybe$Just(1)),
						transform.d4),
					A2(
						add,
						A2(
							elm$core$Maybe$andThen,
							mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
								elm$core$Maybe$Just(0)),
							transform.d_),
						A2(
							add,
							A2(
								elm$core$Maybe$andThen,
								mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(elm$core$Maybe$Nothing),
								transform.a1),
							_Utils_Tuple2(classes, styles)))));
		}
	};
	var _n0 = addTransform(
		addTextShadows(
			addBoxShadows(
				_Utils_Tuple2(_List_Nil, gathered.eS))));
	var newClasses = _n0.a;
	var newStyles = _n0.b;
	return _Utils_update(
		gathered,
		{
			b: A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$vDomClass(
					A2(elm$core$String$join, ' ', newClasses)),
				gathered.b),
			eS: newStyles
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
var mdgriffith$stylish_elephants$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Flag$add = F2(
	function (myFlag, _n0) {
		var one = _n0.a;
		var two = _n0.b;
		if (!myFlag.$) {
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
var mdgriffith$stylish_elephants$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$GridPosition = function (a) {
	return {$: 8, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 7, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$SpacingStyle = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Transform = function (a) {
	return {$: 9, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, x, y);
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return mdgriffith$stylish_elephants$Internal$Style$classes.bM + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.cm);
		case 2:
			return mdgriffith$stylish_elephants$Internal$Style$classes.bM + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.cn);
		default:
			return mdgriffith$stylish_elephants$Internal$Style$classes.bM + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.dn);
	}
};
var mdgriffith$stylish_elephants$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return mdgriffith$stylish_elephants$Internal$Style$classes.bN + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.dt);
		case 2:
			return mdgriffith$stylish_elephants$Internal$Style$classes.bN + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.dm);
		default:
			return mdgriffith$stylish_elephants$Internal$Style$classes.bN + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.$7);
	}
};
var mdgriffith$stylish_elephants$Internal$Model$classNameAttr = function (name) {
	return A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(name));
};
var mdgriffith$stylish_elephants$Internal$Model$gatherHeight = F2(
	function (h, gathered) {
		gatherHeight:
		while (true) {
			switch (h.$) {
				case 0:
					var px = h.a;
					return _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									'height-px-' + elm$core$String$fromInt(px)),
								gathered.b),
							eS: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									mdgriffith$stylish_elephants$Internal$Style$dot(
										'height-px-' + elm$core$String$fromInt(px)),
									'height',
									elm$core$String$fromInt(px) + 'px'),
								gathered.eS)
						});
				case 1:
					return _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.aX),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightContent, gathered.d)
						});
				case 2:
					var portion = h.a;
					return (portion === 1) ? _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.d)
						}) : _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									mdgriffith$stylish_elephants$Internal$Style$classes.d1 + (' height-fill-' + elm$core$String$fromInt(portion))),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.d),
							eS: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.du + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.Y + (' > ' + mdgriffith$stylish_elephants$Internal$Style$dot(
										'height-fill-' + elm$core$String$fromInt(portion)))))),
									'flex-grow',
									elm$core$String$fromInt(portion * 100000)),
								gathered.eS)
						});
				case 3:
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
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightBetween, gathered.d),
							eS: A2(elm$core$List$cons, style, gathered.eS)
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
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightBetween, gathered.d),
							eS: A2(elm$core$List$cons, style, gathered.eS)
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
				case 0:
					var px = w.a;
					return _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									mdgriffith$stylish_elephants$Internal$Style$classes.fe + (' width-px-' + elm$core$String$fromInt(px))),
								gathered.b),
							eS: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									mdgriffith$stylish_elephants$Internal$Style$dot(
										'width-px-' + elm$core$String$fromInt(px)),
									'width',
									elm$core$String$fromInt(px) + 'px'),
								gathered.eS)
						});
				case 1:
					return _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.dg),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthContent, gathered.d)
						});
				case 2:
					var portion = w.a;
					return (portion === 1) ? _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.dh),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.d)
						}) : _Utils_update(
						gathered,
						{
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
									mdgriffith$stylish_elephants$Internal$Style$classes.ff + (' width-fill-' + elm$core$String$fromInt(portion))),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.d),
							eS: A2(
								elm$core$List$cons,
								A3(
									mdgriffith$stylish_elephants$Internal$Model$Single,
									'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.du + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.c4 + (' > ' + mdgriffith$stylish_elephants$Internal$Style$dot(
										'width-fill-' + elm$core$String$fromInt(portion)))))),
									'flex-grow',
									elm$core$String$fromInt(portion * 100000)),
								gathered.eS)
						});
				case 3:
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
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthBetween, gathered.d),
							eS: A2(elm$core$List$cons, style, gathered.eS)
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
							b: A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$classNameAttr(cls),
								gathered.b),
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthBetween, gathered.d),
							eS: A2(elm$core$List$cons, style, gathered.eS)
						});
					var $temp$w = len,
						$temp$gathered = newGathered;
					w = $temp$w;
					gathered = $temp$gathered;
					continue gatherWidth;
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup = {aI: elm$core$Maybe$Nothing, aJ: elm$core$Maybe$Nothing, at: elm$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates = {dk: elm$core$Maybe$Nothing, d_: elm$core$Maybe$Nothing, d4: elm$core$Maybe$Nothing, a1: elm$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$Rotation = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$addIfNothing = F2(
	function (val, existing) {
		if (existing.$ === 1) {
			return val;
		} else {
			var x = existing;
			return x;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackTransforms = F2(
	function (transform, group) {
		switch (transform.$) {
			case 0:
				var mx = transform.a;
				var my = transform.b;
				var mz = transform.c;
				var _n1 = group.at;
				if (_n1.$ === 1) {
					return _Utils_update(
						group,
						{
							at: elm$core$Maybe$Just(
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
							at: elm$core$Maybe$Just(
								_Utils_Tuple3(
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mx, existingX),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, my, existingY),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mz, existingZ)))
						});
				}
			case 1:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				var angle = transform.d;
				return _Utils_update(
					group,
					{
						aI: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								A4(mdgriffith$stylish_elephants$Internal$Model$Rotation, x, y, z, angle)),
							group.aI)
					});
			default:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				return _Utils_update(
					group,
					{
						aJ: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								_Utils_Tuple3(x, y, z)),
							group.aJ)
					});
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackOn = F3(
	function (maybePseudo, transform, gathered) {
		var states = A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates, gathered.e9);
		if (maybePseudo.$ === 1) {
			var normal = states.a1;
			return _Utils_update(
				gathered,
				{
					e9: elm$core$Maybe$Just(
						_Utils_update(
							states,
							{
								a1: elm$core$Maybe$Just(
									A2(
										mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
										transform,
										A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, normal)))
							}))
				});
		} else {
			switch (maybePseudo.a) {
				case 1:
					var _n1 = maybePseudo.a;
					var hover = states.d4;
					return _Utils_update(
						gathered,
						{
							e9: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										d4: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, hover)))
									}))
						});
				case 2:
					var _n2 = maybePseudo.a;
					var active = states.dk;
					return _Utils_update(
						gathered,
						{
							e9: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										dk: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, active)))
									}))
						});
				default:
					var _n3 = maybePseudo.a;
					var focus = states.d_;
					return _Utils_update(
						gathered,
						{
							e9: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										d_: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, focus)))
									}))
						});
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$gatherAttributes = F2(
	function (attr, gathered) {
		var styleName = function (name) {
			return '.' + name;
		};
		var formatStyleClass = function (styleType) {
			switch (styleType.$) {
				case 9:
					var x = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$Transform(x);
				case 12:
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, x, y);
				case 10:
					var selector = styleType.a;
					var style = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
						selector,
						A2(elm$core$List$map, formatStyleClass, style));
				case 0:
					var cls = styleType.a;
					var props = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$Style,
						styleName(cls),
						props);
				case 3:
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Single,
						styleName(cls),
						name,
						val);
				case 4:
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Colored,
						styleName(cls),
						name,
						val);
				case 5:
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, y);
				case 6:
					var top = styleType.a;
					var right = styleType.b;
					var bottom = styleType.c;
					var left = styleType.d;
					return A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, top, right, bottom, left);
				case 7:
					var grid = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle(grid);
				case 8:
					var pos = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridPosition(pos);
				case 1:
					var name = styleType.a;
					var fam = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$FontFamily, name, fam);
				case 2:
					var i = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$FontSize(i);
				default:
					var name = styleType.a;
					var o = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, name, o);
			}
		};
		switch (attr.$) {
			case 0:
				return gathered;
			case 3:
				var flag = attr.a;
				var exactClassName = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gathered.d) ? gathered : _Utils_update(
					gathered,
					{
						b: A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$classNameAttr(exactClassName),
							gathered.b),
						d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gathered.d)
					});
			case 1:
				var attribute = attr.a;
				return _Utils_update(
					gathered,
					{
						b: A2(elm$core$List$cons, attribute, gathered.b)
					});
			case 4:
				var flag = attr.a;
				var style = attr.b;
				var addNormalStyle = F2(
					function (styleProp, gatheredProps) {
						return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gatheredProps.d) ? gatheredProps : _Utils_update(
							gatheredProps,
							{
								b: function () {
									if (styleProp.$ === 10) {
										return A2(
											elm$core$List$cons,
											A2(
												elm$virtual_dom$VirtualDom$property,
												'className',
												elm$json$Json$Encode$string(mdgriffith$stylish_elephants$Internal$Style$classes.fa)),
											A2(
												elm$core$List$cons,
												mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
													mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
												gatheredProps.b));
									} else {
										return A2(
											elm$core$List$cons,
											mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
												mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
											gatheredProps.b);
									}
								}(),
								d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gatheredProps.d),
								eS: A2(
									elm$core$List$cons,
									formatStyleClass(styleProp),
									gatheredProps.eS)
							});
					});
				switch (style.$) {
					case 9:
						var transformation = style.a;
						return A3(mdgriffith$stylish_elephants$Internal$Model$stackOn, elm$core$Maybe$Nothing, transformation, gathered);
					case 10:
						var pseudo = style.a;
						var props = style.b;
						var forTransforms = function (attribute) {
							if (attribute.$ === 9) {
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
			case 7:
				var width = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.d)) ? A2(
					mdgriffith$stylish_elephants$Internal$Model$gatherWidth,
					width,
					_Utils_update(
						gathered,
						{
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.d)
						})) : gathered;
			case 8:
				var height = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.d)) ? A2(
					mdgriffith$stylish_elephants$Internal$Model$gatherHeight,
					height,
					_Utils_update(
						gathered,
						{
							d: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.d)
						})) : gathered;
			case 2:
				var description = attr.a;
				switch (description.$) {
					case 0:
						return _Utils_update(
							gathered,
							{
								q: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'main', gathered.q)
							});
					case 1:
						return _Utils_update(
							gathered,
							{
								q: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'nav', gathered.q)
							});
					case 2:
						return _Utils_update(
							gathered,
							{
								q: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'footer', gathered.q)
							});
					case 3:
						return _Utils_update(
							gathered,
							{
								q: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'aside', gathered.q)
							});
					case 4:
						var i = description.a;
						return (i <= 1) ? _Utils_update(
							gathered,
							{
								q: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h1', gathered.q)
							}) : ((i < 7) ? _Utils_update(
							gathered,
							{
								q: A2(
									mdgriffith$stylish_elephants$Internal$Model$addNodeName,
									'h' + elm$core$String$fromInt(i),
									gathered.q)
							}) : _Utils_update(
							gathered,
							{
								q: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h6', gathered.q)
							}));
					case 8:
						return _Utils_update(
							gathered,
							{
								b: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									gathered.b)
							});
					case 5:
						var label = description.a;
						return _Utils_update(
							gathered,
							{
								b: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									gathered.b)
							});
					case 6:
						return _Utils_update(
							gathered,
							{
								b: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									gathered.b)
							});
					default:
						return _Utils_update(
							gathered,
							{
								b: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									gathered.b)
							});
				}
			case 9:
				var location = attr.a;
				var elem = attr.b;
				var styles = function () {
					switch (elem.$) {
						case 3:
							return elm$core$Maybe$Nothing;
						case 2:
							var str = elem.a;
							return elm$core$Maybe$Nothing;
						case 0:
							var html = elem.a;
							return elm$core$Maybe$Nothing;
						default:
							var styled = elem.a;
							return elm$core$Maybe$Just(
								_Utils_ap(gathered.eS, styled.eS));
					}
				}();
				var nearbyElement = A3(
					elm$virtual_dom$VirtualDom$node,
					'div',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							function () {
								switch (location) {
									case 0:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.dj]));
									case 1:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.dz]));
									case 2:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.ep]));
									case 3:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.en]));
									case 4:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.d8]));
									default:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.dy]));
								}
							}())
						]),
					_List_fromArray(
						[
							function () {
							switch (elem.$) {
								case 3:
									return elm$virtual_dom$VirtualDom$text('');
								case 2:
									var str = elem.a;
									return mdgriffith$stylish_elephants$Internal$Model$textElement(str);
								case 0:
									var html = elem.a;
									return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
								default:
									var styled = elem.a;
									return A2(styled.d5, elm$core$Maybe$Nothing, mdgriffith$stylish_elephants$Internal$Model$asEl);
							}
						}()
						]));
				return _Utils_update(
					gathered,
					{
						cu: A2(elm$core$List$cons, nearbyElement, gathered.cu),
						eS: function () {
							if (styles.$ === 1) {
								return gathered.eS;
							} else {
								var newStyles = styles.a;
								return newStyles;
							}
						}()
					});
			case 6:
				var x = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.d)) ? _Utils_update(
					gathered,
					{
						b: A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignXName(x)),
							gathered.b),
						d: function (flags) {
							switch (x) {
								case 1:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerX, flags);
								case 2:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignRight, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.d))
					}) : gathered;
			case 5:
				var y = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.d)) ? _Utils_update(
					gathered,
					{
						b: A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignYName(y)),
							gathered.b),
						d: function (flags) {
							switch (y) {
								case 1:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerY, flags);
								case 2:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignBottom, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.d))
					}) : gathered;
			case 11:
				var shadow = attr.a;
				var _n13 = gathered.ay;
				if (_n13.$ === 1) {
					return _Utils_update(
						gathered,
						{
							ay: elm$core$Maybe$Just(
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
							ay: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow) + (', ' + existing)))
						});
				}
			default:
				var shadow = attr.a;
				var _n15 = gathered.aN;
				if (_n15.$ === 1) {
					return _Utils_update(
						gathered,
						{
							aN: elm$core$Maybe$Just(
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
							aN: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow) + (', ' + existing)))
						});
				}
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$none = A2(mdgriffith$stylish_elephants$Internal$Flag$Field, 0, 0);
var mdgriffith$stylish_elephants$Internal$Model$Generic = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$initGathered = function (maybeNodeName) {
	return {
		b: _List_Nil,
		ay: elm$core$Maybe$Nothing,
		cu: _List_Nil,
		d: mdgriffith$stylish_elephants$Internal$Flag$none,
		q: function () {
			if (maybeNodeName.$ === 1) {
				return mdgriffith$stylish_elephants$Internal$Model$Generic;
			} else {
				var name = maybeNodeName.a;
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(name);
			}
		}(),
		eS: _List_Nil,
		aN: elm$core$Maybe$Nothing,
		e9: elm$core$Maybe$Nothing
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
var mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$noStyleSheet = mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet;
var mdgriffith$stylish_elephants$Element$Input$button = F2(
	function (attrs, _n0) {
		var onPress = _n0.eo;
		var label = _n0.ef;
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
						mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.aS),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.aA),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.eG),
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
													if (onPress.$ === 1) {
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
var author$project$Main$newChildButton__ = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		author$project$Widget$buttonStyle(
			mdgriffith$stylish_elephants$Element$px(130)),
		{
			ef: mdgriffith$stylish_elephants$Element$text('New subdocument'),
			eo: elm$core$Maybe$Just(author$project$Main$NewChildDocument)
		});
};
var mdgriffith$stylish_elephants$Element$none = mdgriffith$stylish_elephants$Internal$Model$Empty;
var author$project$Main$newChildButton_ = function (model) {
	var headDocument = author$project$DocumentList$getFirst(model.m);
	var _n0 = headDocument.bY;
	if (!_n0) {
		return mdgriffith$stylish_elephants$Element$none;
	} else {
		return author$project$Main$newChildButton__(model);
	}
};
var author$project$Main$newChildButton = function (model) {
	var _n0 = model.t;
	if (!_n0) {
		return mdgriffith$stylish_elephants$Element$none;
	} else {
		return author$project$Main$newChildButton_(model);
	}
};
var author$project$Main$NewDocument = {$: 34};
var author$project$Main$newDocumentButton = function (model) {
	var _n0 = model.t;
	if (!_n0) {
		return mdgriffith$stylish_elephants$Element$none;
	} else {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(
				mdgriffith$stylish_elephants$Element$px(105)),
			{
				ef: mdgriffith$stylish_elephants$Element$text('New document'),
				eo: elm$core$Maybe$Just(author$project$Main$NewDocument)
			});
	}
};
var author$project$Main$ToggleToolPanelState = {$: 33};
var author$project$Main$toggleToolsTitle = function (toolPanelState) {
	if (!toolPanelState) {
		return 'Hide attributes';
	} else {
		return 'Edit attributes';
	}
};
var author$project$Main$toggleToolsButton = F2(
	function (width_, model) {
		var _n0 = model.t;
		if (!_n0) {
			return mdgriffith$stylish_elephants$Element$none;
		} else {
			return A2(
				mdgriffith$stylish_elephants$Element$Input$button,
				author$project$Widget$buttonStyle(width_),
				{
					ef: mdgriffith$stylish_elephants$Element$text(
						author$project$Main$toggleToolsTitle(model.s)),
					eo: elm$core$Maybe$Just(author$project$Main$ToggleToolPanelState)
				});
		}
	});
var author$project$DocumentListView$SetCurrentDocument = elm$core$Basics$identity;
var author$project$Widget$darkRed = A3(mdgriffith$stylish_elephants$Element$rgb, 0.45, 0.0, 0.0);
var mdgriffith$stylish_elephants$Internal$Flag$fontWeight = mdgriffith$stylish_elephants$Internal$Flag$flag(13);
var mdgriffith$stylish_elephants$Element$Font$extraBold = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.eW);
var mdgriffith$stylish_elephants$Element$Font$regular = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.e1);
var author$project$DocumentListView$selectedElementStyle = F2(
	function (maybeSelectedDocument, document) {
		if (maybeSelectedDocument.$ === 1) {
			return _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$regular,
					mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$blue)
				]);
		} else {
			var selectedDocument = maybeSelectedDocument.a;
			return _Utils_eq(selectedDocument.Z, document.Z) ? _List_fromArray(
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
var elm$core$String$toUpper = _String_toUpper;
var author$project$DocumentListView$transformedTitle = function (doc) {
	var _n0 = doc.bY;
	if (_n0 === 1) {
		return elm$core$String$toUpper(doc.as);
	} else {
		return doc.as;
	}
};
var author$project$Widget$lightYellow = A3(mdgriffith$stylish_elephants$Element$rgb, 0.9, 0.9, 0.8);
var mdgriffith$stylish_elephants$Internal$Flag$overflow = mdgriffith$stylish_elephants$Internal$Flag$flag(20);
var mdgriffith$stylish_elephants$Element$clipX = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.dM);
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
					ef: A2(
						mdgriffith$stylish_elephants$Element$el,
						A2(author$project$DocumentListView$selectedElementStyle, maybeSelectedDocument, document),
						mdgriffith$stylish_elephants$Element$text(
							author$project$DocumentListView$transformedTitle(document))),
					eo: elm$core$Maybe$Just(document)
				}));
	});
var mdgriffith$stylish_elephants$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Element$fill = mdgriffith$stylish_elephants$Internal$Model$Fill(1);
var mdgriffith$stylish_elephants$Internal$Model$AsColumn = 1;
var mdgriffith$stylish_elephants$Internal$Model$asColumn = 1;
var mdgriffith$stylish_elephants$Element$column = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asColumn,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.dP),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cx),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Element$scrollbarY = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.eF);
var mdgriffith$stylish_elephants$Internal$Flag$spacing = mdgriffith$stylish_elephants$Internal$Flag$flag(3);
var mdgriffith$stylish_elephants$Element$spacing = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$spacing,
		A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, x));
};
var author$project$DocumentListView$view = F2(
	function (height_, docList) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(5),
					mdgriffith$stylish_elephants$Element$scrollbarY,
					mdgriffith$stylish_elephants$Element$height(
					mdgriffith$stylish_elephants$Element$px(height_ - 150))
				]),
			A2(
				elm$core$List$map,
				author$project$DocumentListView$setCurrentDocumentButton(
					author$project$DocumentList$selected(docList)),
				author$project$DocumentList$documents(docList)));
	});
var mdgriffith$stylish_elephants$Internal$Flag$moveX = mdgriffith$stylish_elephants$Internal$Flag$flag(25);
var mdgriffith$stylish_elephants$Internal$Model$Move = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Element$moveRight = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$moveX,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm$core$Maybe$Just(x),
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Element$Font$bold = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.dA);
var author$project$DocumentListView$viewWithHeading = F3(
	function (height_, heading, docList) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(10)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$moveRight(10),
							mdgriffith$stylish_elephants$Element$Font$size(18),
							mdgriffith$stylish_elephants$Element$Font$bold
						]),
					mdgriffith$stylish_elephants$Element$text(heading)),
					A2(author$project$DocumentListView$view, height_, docList)
				]));
	});
var author$project$Main$DocListViewMsg = function (a) {
	return {$: 20, a: a};
};
var author$project$Main$docListTitle = function (model) {
	var firstDocument = author$project$DocumentList$getFirst(model.m);
	var title = function () {
		var _n0 = firstDocument.bY;
		if (!_n0) {
			return 'Search Results';
		} else {
			return 'Contents';
		}
	}();
	var documentCount = elm$core$List$length(
		author$project$DocumentList$documents(model.m));
	return title + (' (' + (elm$core$String$fromInt(documentCount) + ')'));
};
var author$project$Main$CancelDeleteCurrentDocument = {$: 40};
var author$project$Main$cancelDeleteCurrentDocumentButton_ = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Cancel'),
				eo: elm$core$Maybe$Just(author$project$Main$CancelDeleteCurrentDocument)
			});
	});
var author$project$Main$cancelDeleteCurrentDocumentButton = F2(
	function (width_, model) {
		var _n0 = model.D;
		if (!_n0) {
			return mdgriffith$stylish_elephants$Element$none;
		} else {
			return A2(author$project$Main$cancelDeleteCurrentDocumentButton_, width_, model);
		}
	});
var author$project$Main$DeleteCurrentDocument = {$: 39};
var author$project$Widget$red = A3(mdgriffith$stylish_elephants$Element$rgb, 1.0, 0, 0.0);
var author$project$Main$deleteButtonBackgroundColor = function (model) {
	var _n0 = model.D;
	if (!_n0) {
		return author$project$Widget$blue;
	} else {
		return author$project$Widget$red;
	}
};
var author$project$Widget$buttonStyleWithColor = F2(
	function (backgroundColor, width_) {
		return _List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$size(13),
				mdgriffith$stylish_elephants$Element$mouseDown(
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(13),
						mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$mouseDownColor)
					])),
				mdgriffith$stylish_elephants$Element$Background$color(backgroundColor),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$white),
				mdgriffith$stylish_elephants$Element$width(width_),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(24)),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, 10, 0),
				mdgriffith$stylish_elephants$Element$Border$rounded(8)
			]);
	});
var author$project$Main$deleteCurrentDocumentButton = F2(
	function (width_, model) {
		var _n0 = model.h;
		if (_n0.$ === 1) {
			return mdgriffith$stylish_elephants$Element$none;
		} else {
			return A2(
				mdgriffith$stylish_elephants$Element$Input$button,
				A2(
					author$project$Widget$buttonStyleWithColor,
					author$project$Main$deleteButtonBackgroundColor(model),
					width_),
				{
					ef: mdgriffith$stylish_elephants$Element$text('Delete'),
					eo: elm$core$Maybe$Just(author$project$Main$DeleteCurrentDocument)
				});
		}
	});
var author$project$Main$SetDocumentType = function (a) {
	return {$: 37, a: a};
};
var mdgriffith$stylish_elephants$Element$Font$light = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.e$);
var author$project$Main$highLightDocumentType = F2(
	function (docType1, docType2) {
		var _n0 = _Utils_eq(docType1, docType2);
		if (_n0) {
			return _List_fromArray(
				[mdgriffith$stylish_elephants$Element$Font$bold]);
		} else {
			return _List_fromArray(
				[mdgriffith$stylish_elephants$Element$Font$light]);
		}
	});
var author$project$Widget$listItemStyleNarrow = function (width_) {
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
			mdgriffith$stylish_elephants$Element$px(16)),
			A2(mdgriffith$stylish_elephants$Element$paddingXY, 20, 0),
			mdgriffith$stylish_elephants$Element$clipX
		]);
};
var author$project$Main$documentTypeButtonStyle = F2(
	function (model, docType) {
		return _Utils_ap(
			author$project$Widget$listItemStyleNarrow(
				mdgriffith$stylish_elephants$Element$px(110)),
			A2(author$project$Main$highLightDocumentType, model.a.bY, docType));
	});
var author$project$Main$masterDocumentButton = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		A2(author$project$Main$documentTypeButtonStyle, model, 1),
		{
			ef: mdgriffith$stylish_elephants$Element$text('Master'),
			eo: elm$core$Maybe$Just(
				author$project$Main$SetDocumentType(1))
		});
};
var author$project$Main$standardDocumentButton = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		A2(author$project$Main$documentTypeButtonStyle, model, 0),
		{
			ef: mdgriffith$stylish_elephants$Element$text('Standard'),
			eo: elm$core$Maybe$Just(
				author$project$Main$SetDocumentType(0))
		});
};
var author$project$Main$documentTypePanel = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$spacing(5)
			]),
		_List_fromArray(
			[
				author$project$Main$standardDocumentButton(model),
				author$project$Main$masterDocumentButton(model)
			]));
};
var author$project$Main$SetDocumentTextType = function (a) {
	return {$: 36, a: a};
};
var author$project$Main$highLightTextType = F2(
	function (textType1, textType2) {
		var _n0 = _Utils_eq(textType1, textType2);
		if (_n0) {
			return _List_fromArray(
				[mdgriffith$stylish_elephants$Element$Font$bold]);
		} else {
			return _List_fromArray(
				[mdgriffith$stylish_elephants$Element$Font$light]);
		}
	});
var author$project$Main$textTypeButtonStyle = F2(
	function (model, textType) {
		return _Utils_ap(
			author$project$Widget$listItemStyleNarrow(
				mdgriffith$stylish_elephants$Element$px(110)),
			A2(author$project$Main$highLightTextType, model.a.ch, textType));
	});
var author$project$Main$asciidocLatexTypeButton = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		A2(author$project$Main$textTypeButtonStyle, model, 3),
		{
			ef: mdgriffith$stylish_elephants$Element$text('Asciidoc Latex'),
			eo: elm$core$Maybe$Just(
				author$project$Main$SetDocumentTextType(3))
		});
};
var author$project$Main$asciidocTypeButton = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		A2(author$project$Main$textTypeButtonStyle, model, 2),
		{
			ef: mdgriffith$stylish_elephants$Element$text('Asciidoc'),
			eo: elm$core$Maybe$Just(
				author$project$Main$SetDocumentTextType(2))
		});
};
var author$project$Main$markdownTypeButton = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		A2(author$project$Main$textTypeButtonStyle, model, 1),
		{
			ef: mdgriffith$stylish_elephants$Element$text('Markdown'),
			eo: elm$core$Maybe$Just(
				author$project$Main$SetDocumentTextType(1))
		});
};
var author$project$Main$miniLatexTypeButton = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		A2(author$project$Main$textTypeButtonStyle, model, 0),
		{
			ef: mdgriffith$stylish_elephants$Element$text('MiniLatex'),
			eo: elm$core$Maybe$Just(
				author$project$Main$SetDocumentTextType(0))
		});
};
var author$project$Document$PlainText = 4;
var author$project$Main$plainTextTypeButton = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$button,
		A2(author$project$Main$textTypeButtonStyle, model, 4),
		{
			ef: mdgriffith$stylish_elephants$Element$text('Plain Text'),
			eo: elm$core$Maybe$Just(
				author$project$Main$SetDocumentTextType(4))
		});
};
var author$project$Main$textTypePanel = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$spacing(5)
			]),
		_List_fromArray(
			[
				author$project$Main$miniLatexTypeButton(model),
				author$project$Main$asciidocTypeButton(model),
				author$project$Main$asciidocLatexTypeButton(model),
				author$project$Main$markdownTypeButton(model),
				author$project$Main$plainTextTypeButton(model)
			]));
};
var author$project$Main$documentPanels = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
				mdgriffith$stylish_elephants$Element$spacing(10)
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[mdgriffith$stylish_elephants$Element$Font$bold]),
				mdgriffith$stylish_elephants$Element$text('Text type')),
				author$project$Main$textTypePanel(model),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[mdgriffith$stylish_elephants$Element$Font$bold]),
				mdgriffith$stylish_elephants$Element$text('Document type')),
				author$project$Main$documentTypePanel(model)
			]));
};
var author$project$Main$AcceptDocumenTitle = function (a) {
	return {$: 5, a: a};
};
var author$project$Widget$black = A3(mdgriffith$stylish_elephants$Element$rgb, 0.1, 0.1, 0.1);
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var mdgriffith$stylish_elephants$Element$htmlAttribute = mdgriffith$stylish_elephants$Internal$Model$Attr;
var mdgriffith$stylish_elephants$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$Above = 0;
var mdgriffith$stylish_elephants$Element$Input$labelAbove = mdgriffith$stylish_elephants$Element$Input$Label(0);
var mdgriffith$stylish_elephants$Element$Input$TextInputNode = function (a) {
	return {$: 0, a: a};
};
var elm$core$String$lines = _String_lines;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
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
var mdgriffith$stylish_elephants$Internal$Model$InFront = 4;
var mdgriffith$stylish_elephants$Element$inFront = function (element) {
	return A2(mdgriffith$stylish_elephants$Internal$Model$Nearby, 4, element);
};
var mdgriffith$stylish_elephants$Element$paddingEach = function (_n0) {
	var top = _n0.e6;
	var right = _n0.eA;
	var bottom = _n0.dF;
	var left = _n0.eh;
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
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$AsRow = 0;
var mdgriffith$stylish_elephants$Internal$Model$asRow = 0;
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
		switch (position) {
			case 0:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 1:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 2:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 3:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 4:
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
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var mdgriffith$stylish_elephants$Element$Input$autofill = A2(
	elm$core$Basics$composeL,
	mdgriffith$stylish_elephants$Internal$Model$Attr,
	elm$html$Html$Attributes$attribute('autocomplete'));
var mdgriffith$stylish_elephants$Element$Input$charcoal = A3(mdgriffith$stylish_elephants$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
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
var mdgriffith$stylish_elephants$Internal$Model$LivePolite = {$: 6};
var mdgriffith$stylish_elephants$Element$Region$announce = mdgriffith$stylish_elephants$Internal$Model$Describe(mdgriffith$stylish_elephants$Internal$Model$LivePolite);
var mdgriffith$stylish_elephants$Internal$Model$filter = function (attrs) {
	return A3(
		elm$core$List$foldr,
		F2(
			function (x, _n0) {
				var found = _n0.a;
				var has = _n0.b;
				switch (x.$) {
					case 0:
						return _Utils_Tuple2(found, has);
					case 3:
						var key = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 1:
						var attr = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 4:
						var style = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 7:
						var width = x.a;
						return A2(elm$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'width', has));
					case 8:
						var height = x.a;
						return A2(elm$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'height', has));
					case 2:
						var description = x.a;
						return A2(elm$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'described', has));
					case 9:
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 6:
						return A2(elm$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-x', has));
					case 5:
						return A2(elm$core$Set$member, 'align-y', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-y', has));
					case 11:
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
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var mdgriffith$stylish_elephants$Internal$Model$unstyled = A2(elm$core$Basics$composeL, mdgriffith$stylish_elephants$Internal$Model$Unstyled, elm$core$Basics$always);
var mdgriffith$stylish_elephants$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var forNearby = function (attr) {
			if (attr.$ === 9) {
				return true;
			} else {
				return false;
			}
		};
		var behavior = function () {
			var _n25 = textOptions.am;
			if (_n25.$ === 1) {
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
						case 7:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _n22$7;
							}
						case 8:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _n22$7;
							}
						case 6:
							return true;
						case 5:
							return true;
						case 4:
							switch (attr.b.$) {
								case 5:
									var _n23 = attr.b;
									return true;
								case 2:
									return true;
								case 1:
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
				if ((attr.$ === 4) && (attr.b.$ === 6)) {
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
				if (attr.$ === 9) {
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
			var _n1 = textInput.O;
			if (!_n1.$) {
				var inputType = _n1.a;
				return _Utils_Tuple3(
					'input',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$value(textOptions.ar),
								mdgriffith$stylish_elephants$Internal$Model$Attr(
								elm$html$Html$Attributes$type_(inputType)),
								mdgriffith$stylish_elephants$Element$Input$spellcheck(textInput.F),
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ec),
								function () {
								var _n2 = textInput.B;
								if (_n2.$ === 1) {
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
									case 2:
										return found;
									case 8:
										var val = attr.a;
										var _n5 = found.aX;
										if (_n5.$ === 1) {
											if (val.$ === 1) {
												return _Utils_update(
													found,
													{
														H: A2(elm$core$List$cons, attr, found.H),
														aX: elm$core$Maybe$Just(val)
													});
											} else {
												return _Utils_update(
													found,
													{
														aX: elm$core$Maybe$Just(val)
													});
											}
										} else {
											var i = _n5.a;
											return found;
										}
									case 4:
										switch (attr.b.$) {
											case 6:
												var _n7 = attr.b;
												var t = _n7.a;
												var r = _n7.b;
												var b = _n7.c;
												var l = _n7.d;
												var _n8 = found.bu;
												if (_n8.$ === 1) {
													return _Utils_update(
														found,
														{
															H: found.H,
															bu: elm$core$Maybe$Just(
																A4(mdgriffith$stylish_elephants$Element$Input$Padding, t, r, b, l))
														});
												} else {
													return found;
												}
											case 5:
												var _n9 = attr.b;
												var x = _n9.a;
												var y = _n9.b;
												var _n10 = found.bv;
												if (_n10.$ === 1) {
													return _Utils_update(
														found,
														{
															H: A2(elm$core$List$cons, attr, found.H),
															bv: elm$core$Maybe$Just(y)
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
									H: A2(elm$core$List$cons, attr, found.H)
								});
						}),
					{H: _List_Nil, aX: elm$core$Maybe$Nothing, bu: elm$core$Maybe$Nothing, bv: elm$core$Maybe$Nothing},
					attributes);
				var maybePadding = _n3.bu;
				var heightContent = _n3.aX;
				var maybeSpacing = _n3.bv;
				var adjustedAttributes = _n3.H;
				var spacing = A2(elm$core$Maybe$withDefault, 5, maybeSpacing);
				return _Utils_Tuple3(
					'textarea',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$spellcheck(textInput.F),
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.eb),
								A2(
								elm$core$Maybe$withDefault,
								mdgriffith$stylish_elephants$Internal$Model$NoAttribute,
								A2(elm$core$Maybe$map, mdgriffith$stylish_elephants$Element$Input$autofill, textInput.B)),
								function () {
								if (maybePadding.$ === 1) {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									var _n12 = maybePadding.a;
									var t = _n12.a;
									var r = _n12.b;
									var b = _n12.c;
									var l = _n12.d;
									return mdgriffith$stylish_elephants$Element$paddingEach(
										{
											dF: A2(elm$core$Basics$max, 0, b - ((spacing / 2) | 0)),
											eh: l,
											eA: r,
											e6: A2(elm$core$Basics$max, 0, t - ((spacing / 2) | 0))
										});
								}
							}(),
								function () {
								if (heightContent.$ === 1) {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									if (heightContent.a.$ === 1) {
										var _n14 = heightContent.a;
										var newlineCount = function (x) {
											return (x < 1) ? 1 : x;
										}(
											elm$core$List$length(
												elm$core$String$lines(textOptions.ar)));
										var heightValue = function (count) {
											if (maybePadding.$ === 1) {
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
							elm$html$Html$text(textOptions.ar))
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
							var _n17 = textOptions.ap;
							if (_n17.$ === 1) {
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
																mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.el + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.et)),
																mdgriffith$stylish_elephants$Element$Border$color(
																A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0)),
																mdgriffith$stylish_elephants$Element$Background$color(
																A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0)),
																mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
																mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
																mdgriffith$stylish_elephants$Element$alpha(
																(elm$core$String$trim(textOptions.ar) !== '') ? 0 : 1)
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
				A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$cursor, mdgriffith$stylish_elephants$Internal$Style$classes.dS),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$spacing(5),
					A2(elm$core$List$cons, mdgriffith$stylish_elephants$Element$Region$announce, attributesFromChild))),
			textOptions.ef,
			inputElement);
	});
var mdgriffith$stylish_elephants$Element$Input$text = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		B: elm$core$Maybe$Nothing,
		F: false,
		O: mdgriffith$stylish_elephants$Element$Input$TextInputNode('text')
	});
var author$project$Main$documentTitleInput = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$text,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				elm$html$Html$Attributes$id('title-input')),
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(250)),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(30)),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$black)
			]),
		{
			ef: A2(
				mdgriffith$stylish_elephants$Element$Input$labelAbove,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(14),
						mdgriffith$stylish_elephants$Element$Font$bold
					]),
				mdgriffith$stylish_elephants$Element$text('Title')),
			am: elm$core$Maybe$Just(
				function (str) {
					return author$project$Main$AcceptDocumenTitle(str);
				}),
			ap: elm$core$Maybe$Nothing,
			ar: model.aC
		});
};
var author$project$Main$masterDocPanel = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$spacing(5)
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_Nil,
				mdgriffith$stylish_elephants$Element$text(
					'Master doc: ' + elm$core$String$fromInt(model.a.bz)))
			]));
};
var author$project$Main$AcceptDocumentTagString = function (a) {
	return {$: 6, a: a};
};
var mdgriffith$stylish_elephants$Element$padding = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$padding,
		A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, x, x, x, x));
};
var mdgriffith$stylish_elephants$Element$Input$TextArea = {$: 1};
var mdgriffith$stylish_elephants$Element$Input$multiline = F2(
	function (attrs, multi) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{B: elm$core$Maybe$Nothing, F: multi.c9, O: mdgriffith$stylish_elephants$Element$Input$TextArea},
			attrs,
			{ef: multi.ef, am: multi.am, ap: multi.ap, ar: multi.ar});
	});
var mdgriffith$stylish_elephants$Element$Keyed$row = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asRow,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cx),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.aA),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						attrs))),
			mdgriffith$stylish_elephants$Internal$Model$Keyed(children));
	});
var author$project$Main$tagInputPane_ = F4(
	function (model, width_, height_, label_) {
		return A2(
			mdgriffith$stylish_elephants$Element$Keyed$row,
			_List_Nil,
			_List_fromArray(
				[
					_Utils_Tuple2(
					elm$core$String$fromInt(model.af),
					A2(
						mdgriffith$stylish_elephants$Element$Input$multiline,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$width(width_),
								mdgriffith$stylish_elephants$Element$height(height_),
								mdgriffith$stylish_elephants$Element$padding(10),
								mdgriffith$stylish_elephants$Element$scrollbarY
							]),
						{
							ef: A2(
								mdgriffith$stylish_elephants$Element$Input$labelAbove,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$size(14),
										mdgriffith$stylish_elephants$Element$Font$bold
									]),
								mdgriffith$stylish_elephants$Element$text('')),
							am: elm$core$Maybe$Just(author$project$Main$AcceptDocumentTagString),
							ap: elm$core$Maybe$Nothing,
							c9: false,
							ar: A2(elm$core$String$join, ', ', model.a.cg)
						}))
				]));
	});
var author$project$Main$tagInputPane = F4(
	function (model, width_, height_, label_) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[mdgriffith$stylish_elephants$Element$Font$bold]),
					mdgriffith$stylish_elephants$Element$text(label_)),
					A4(author$project$Main$tagInputPane_, model, width_, height_, label_)
				]));
	});
var author$project$Main$newVersionUrl = function (document) {
	return author$project$Configuration$backend + ('/archive/new_version' + ('/' + elm$core$String$fromInt(document.Z)));
};
var author$project$Widget$listItemStyleNarrow2 = function (width_) {
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
			mdgriffith$stylish_elephants$Element$px(16)),
			mdgriffith$stylish_elephants$Element$clipX
		]);
};
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var mdgriffith$stylish_elephants$Element$newTabLink = F2(
	function (attrs, _n0) {
		var url = _n0.bf;
		var label = _n0.ef;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$Attr(
							elm$html$Html$Attributes$target('_blank')),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
								A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.aS),
									A2(
										elm$core$List$cons,
										mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.aA),
										attrs))))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Widget$linkButton = F3(
	function (url, label_, width_) {
		return A2(
			mdgriffith$stylish_elephants$Element$newTabLink,
			author$project$Widget$listItemStyleNarrow2(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text(label_),
				bf: url
			});
	});
var author$project$Main$newVersionButton = function (model) {
	return A3(
		author$project$Widget$linkButton,
		author$project$Main$newVersionUrl(model.a),
		'New version',
		mdgriffith$stylish_elephants$Element$px(100));
};
var author$project$Main$showVersionsUrl = function (document) {
	return author$project$Configuration$backend + ('/archive/versions' + ('/' + elm$core$String$fromInt(document.Z)));
};
var author$project$Main$showVersionButton = function (model) {
	return A3(
		author$project$Widget$linkButton,
		author$project$Main$showVersionsUrl(model.a),
		'Show versions',
		mdgriffith$stylish_elephants$Element$px(100));
};
var author$project$Main$versionsPanel = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$spacing(5)
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_Nil,
				mdgriffith$stylish_elephants$Element$text(
					'Version: ' + elm$core$String$fromInt(model.a.ci))),
				A2(
				mdgriffith$stylish_elephants$Element$column,
				_List_Nil,
				_List_fromArray(
					[
						author$project$Main$showVersionButton(model),
						author$project$Main$newVersionButton(model)
					]))
			]));
};
var mdgriffith$stylish_elephants$Element$row = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asRow,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cx),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.aA),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var author$project$Main$toolsPanel = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$spacing(15),
				mdgriffith$stylish_elephants$Element$padding(10),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
				mdgriffith$stylish_elephants$Element$scrollbarY
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$bold,
						mdgriffith$stylish_elephants$Element$Font$size(18)
					]),
				mdgriffith$stylish_elephants$Element$text('Tools Panel')),
				A2(
				mdgriffith$stylish_elephants$Element$row,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$spacing(10)
					]),
				_List_fromArray(
					[
						A2(
						author$project$Main$deleteCurrentDocumentButton,
						mdgriffith$stylish_elephants$Element$px(60),
						model),
						A2(
						author$project$Main$cancelDeleteCurrentDocumentButton,
						mdgriffith$stylish_elephants$Element$px(60),
						model)
					])),
				author$project$Main$masterDocPanel(model),
				author$project$Main$documentTitleInput(model),
				author$project$Main$documentPanels(model),
				A4(
				author$project$Main$tagInputPane,
				model,
				mdgriffith$stylish_elephants$Element$px(250),
				mdgriffith$stylish_elephants$Element$px(140),
				'Tags'),
				author$project$Main$versionsPanel(model)
			]));
};
var mdgriffith$stylish_elephants$Element$map = mdgriffith$stylish_elephants$Internal$Model$map;
var author$project$Main$toolsOrContents = function (model) {
	var _n0 = model.s;
	if (!_n0) {
		return author$project$Main$toolsPanel(model);
	} else {
		return A2(
			mdgriffith$stylish_elephants$Element$map,
			author$project$Main$DocListViewMsg,
			A3(
				author$project$DocumentListView$viewWithHeading,
				model.P,
				author$project$Main$docListTitle(model),
				model.m));
	}
};
var author$project$Widget$lightBlue = A3(mdgriffith$stylish_elephants$Element$rgb, 0.85, 0.85, 0.9);
var mdgriffith$stylish_elephants$Element$fillPortion = mdgriffith$stylish_elephants$Internal$Model$Fill;
var author$project$Main$bodyLeftColumn = F2(
	function (portion_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(
					mdgriffith$stylish_elephants$Element$fillPortion(portion_)),
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightBlue),
					A2(mdgriffith$stylish_elephants$Element$paddingXY, 20, 20),
					mdgriffith$stylish_elephants$Element$spacing(10)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$row,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$spacing(10)
						]),
					_List_fromArray(
						[
							A2(
							author$project$Main$toggleToolsButton,
							mdgriffith$stylish_elephants$Element$px(105),
							model),
							author$project$Main$newDocumentButton(model)
						])),
					author$project$Main$newChildButton(model),
					author$project$Main$toolsOrContents(model)
				]));
	});
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
var author$project$DocumentView$contentView = F3(
	function (windowHeight_, counter, viewDoc) {
		return A2(
			mdgriffith$stylish_elephants$Element$Keyed$el,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$height(
					mdgriffith$stylish_elephants$Element$px(windowHeight_ - 150)),
					mdgriffith$stylish_elephants$Element$scrollbarY
				]),
			_Utils_Tuple2(
				elm$core$String$fromInt(counter),
				viewDoc.az));
	});
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$html$Html$Attributes$property = elm$virtual_dom$VirtualDom$property;
var author$project$DocumentView$asciidocText = function (str) {
	return A3(
		elm$html$Html$node,
		'asciidoc-text',
		_List_fromArray(
			[
				A2(
				elm$html$Html$Attributes$property,
				'content',
				elm$json$Json$Encode$string(str))
			]),
		_List_Nil);
};
var mdgriffith$stylish_elephants$Element$html = mdgriffith$stylish_elephants$Internal$Model$unstyled;
var author$project$DocumentView$viewAsciidoc = F2(
	function (debounceCounter, str) {
		return A2(
			mdgriffith$stylish_elephants$Element$Keyed$el,
			_List_Nil,
			_Utils_Tuple2(
				'Asciidoc.' + elm$core$String$fromInt(debounceCounter),
				mdgriffith$stylish_elephants$Element$html(
					author$project$DocumentView$asciidocText(str))));
	});
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var elm$html$Html$br = _VirtualDom_node('br');
var elm$html$Html$code = _VirtualDom_node('code');
var elm$html$Html$em = _VirtualDom_node('em');
var elm$html$Html$img = _VirtualDom_node('img');
var elm$html$Html$strong = _VirtualDom_node('strong');
var elm$html$Html$Attributes$alt = elm$html$Html$Attributes$stringProperty('alt');
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var pablohirafuji$elm_markdown$Markdown$Inline$Emphasis = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
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
			case 0:
				var str = inline.a;
				return _Utils_ap(text, str);
			case 1:
				return text + ' ';
			case 2:
				var str = inline.a;
				return _Utils_ap(text, str);
			case 3:
				var inlines = inline.c;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 4:
				var inlines = inline.c;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 5:
				var inlines = inline.c;
				return _Utils_ap(
					text,
					pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 6:
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
			case 0:
				var str = inline.a;
				return elm$html$Html$text(str);
			case 1:
				return A2(elm$html$Html$br, _List_Nil, _List_Nil);
			case 2:
				var codeStr = inline.a;
				return A2(
					elm$html$Html$code,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(codeStr)
						]));
			case 3:
				var url = inline.a;
				var maybeTitle = inline.b;
				var inlines = inline.c;
				if (!maybeTitle.$) {
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
			case 4:
				var url = inline.a;
				var maybeTitle = inline.b;
				var inlines = inline.c;
				if (!maybeTitle.$) {
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
			case 5:
				var tag = inline.a;
				var attrs = inline.b;
				var inlines = inline.c;
				return A3(
					elm$html$Html$node,
					tag,
					pablohirafuji$elm_markdown$Markdown$Inline$attributesToHtmlAttributes(attrs),
					A2(elm$core$List$map, transformer, inlines));
			case 6:
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
	if (inline.$ === 3) {
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
			case 0:
				return _List_Nil;
			case 2:
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
			case 1:
				return _List_fromArray(
					[
						A2(elm$html$Html$hr, _List_Nil, _List_Nil)
					]);
			case 4:
				var inlines = block.b;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$p,
						_List_Nil,
						A2(elm$core$List$map, inlineToHtml, inlines))
					]);
			case 3:
				if (block.a.$ === 1) {
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
					var _n3 = model.b1;
					if (!_n3.$) {
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
			case 5:
				var blocks = block.a;
				return function (a) {
					return A2(elm$core$List$cons, a, _List_Nil);
				}(
					A2(
						elm$html$Html$blockquote,
						_List_Nil,
						elm$core$List$concat(
							A2(elm$core$List$map, blockToHtml, blocks))));
			case 6:
				var model = block.a;
				var items = block.b;
				return function (a) {
					return A2(elm$core$List$cons, a, _List_Nil);
				}(
					function () {
						var _n5 = model.O;
						if (_n5.$ === 1) {
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
			case 7:
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
				return $.ei;
			},
			A2(
				elm$regex$Regex$find,
				author$project$Utility$softBreakRegexp(width),
				string));
	});
var author$project$Utility$softBreakAltAux = F2(
	function (width, string) {
		return (_Utils_cmp(
			elm$core$String$length(string),
			width) < 0) ? _List_fromArray(
			[string]) : A2(author$project$Utility$softBreak, width, string);
	});
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
		if (!maybe.$) {
			var v = maybe.a;
			return elm$core$Result$Ok(v);
		} else {
			return elm$core$Result$Err(err);
		}
	});
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$regex$Regex$findAtMost = _Regex_findAtMost;
var pablohirafuji$elm_markdown$Markdown$Block$BlockQuote = function (a) {
	return {$: 5, a: a};
};
var pablohirafuji$elm_markdown$Markdown$Block$List = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$Paragraph = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
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
	var indentLength = (isIndentedCode || A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, rawLine)) ? (listBlock.u - indentSpaceLength) : listBlock.u;
	return _Utils_Tuple2(
		_Utils_update(
			listBlock,
			{u: indentLength}),
		updtRawLine);
};
var pablohirafuji$elm_markdown$Markdown$Block$atxHeadingLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^ {0,3}(#{1,6})' + ('(?:[ \\t]+[ \\t#]+$|[ \\t]+|$)' + '(.*?)(?:\\s+[ \\t#]*)?$')));
var pablohirafuji$elm_markdown$Markdown$Block$Heading = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Block$extractATXHeadingRM = function (match) {
	var _n0 = match.eT;
	if ((_n0.b && (!_n0.a.$)) && _n0.b.b) {
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
	return {$: 0, a: a};
};
var pablohirafuji$elm_markdown$Markdown$Block$CodeBlock = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$Fenced = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$addBlankLineToListBlock = F2(
	function (match, asts) {
		if (!asts.b) {
			return _List_fromArray(
				[
					_List_fromArray(
					[
						pablohirafuji$elm_markdown$Markdown$Block$BlankLine(match.ei)
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
					case 3:
						if ((ast.a.a.$ === 1) && ast.a.a.a) {
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
					case 6:
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
			pablohirafuji$elm_markdown$Markdown$Block$BlankLine(match.ei),
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
var pablohirafuji$elm_markdown$Markdown$Block$Indented = {$: 0};
var pablohirafuji$elm_markdown$Markdown$Block$blocksAfterBlankLines = F2(
	function (ast, blankLines) {
		blocksAfterBlankLines:
		while (true) {
			if (ast.b && (!ast.a.$)) {
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
					case 4:
						var _n1 = ast.a;
						var paragraph = _n1.a;
						var astTail = ast.b;
						return elm$core$Maybe$Just(
							A2(
								elm$core$List$cons,
								A2(pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, paragraph, rawLine),
								astTail));
					case 5:
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
					case 6:
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
		if ((remainBlocks.b && (remainBlocks.a.$ === 3)) && (!remainBlocks.a.a.$)) {
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
					case 3:
						if (!ast.a.a.$) {
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
					case 0:
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
								return $.eT;
							},
							elm$core$List$head),
						elm$core$List$head(
							A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$Block$indentedCodeLineRegex, rawLine)))))));
};
var pablohirafuji$elm_markdown$Markdown$Entity$decimalRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('&#([0-9]{1,8});'));
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
		match.ei,
		A2(
			elm$core$Maybe$map,
			pablohirafuji$elm_markdown$Markdown$Entity$validUnicode,
			A2(
				elm$core$Maybe$andThen,
				elm$core$String$toInt,
				A2(
					elm$core$Maybe$withDefault,
					elm$core$Maybe$Nothing,
					elm$core$List$head(match.eT)))));
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
		match.ei,
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
					elm$core$List$head(match.eT)))));
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
		match.ei,
		A2(
			elm$core$Maybe$map,
			A2(elm$core$Basics$composeR, pablohirafuji$elm_markdown$Markdown$Entity$hexToInt, pablohirafuji$elm_markdown$Markdown$Entity$validUnicode),
			A2(
				elm$core$Maybe$withDefault,
				elm$core$Maybe$Nothing,
				elm$core$List$head(match.eT))));
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
		var _n0 = regexMatch.eT;
		if (((_n0.b && (!_n0.a.$)) && _n0.b.b) && (!_n0.b.a.$)) {
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
			return regexMatch.ei;
		}
	});
var pablohirafuji$elm_markdown$Markdown$Helpers$formatStr = function (str) {
	return pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimals(
		pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimals(
			pablohirafuji$elm_markdown$Markdown$Entity$replaceEntities(
				pablohirafuji$elm_markdown$Markdown$Helpers$replaceEscapable(str))));
};
var pablohirafuji$elm_markdown$Markdown$Block$extractOpenCodeFenceRM = function (match) {
	var _n0 = match.eT;
	if (((_n0.b && _n0.b.b) && (!_n0.b.a.$)) && _n0.b.b.b) {
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
					bZ: A2(elm$core$String$left, 1, fence),
					b_: elm$core$String$length(fence),
					u: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Maybe$map, elm$core$String$length, maybeIndent)),
					b1: A2(
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
	return {$: 1, a: a};
};
var pablohirafuji$elm_markdown$Markdown$Block$Unordered = {$: 0};
var pablohirafuji$elm_markdown$Markdown$Block$extractOrderedListRM = function (match) {
	var _n0 = match.eT;
	if (((((((_n0.b && (!_n0.a.$)) && _n0.b.b) && (!_n0.b.a.$)) && _n0.b.b.b) && (!_n0.b.b.a.$)) && _n0.b.b.b.b) && _n0.b.b.b.b.b) {
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
					aU: delimiter,
					u: elm$core$String$length(indentString) + 1,
					_: false,
					O: A2(
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
	var _n0 = match.eT;
	if (_n0.b && (!_n0.a.$)) {
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
		if (ast.b && (ast.a.$ === 4)) {
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
var pablohirafuji$elm_markdown$Markdown$Block$ThematicBreak = {$: 1};
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
	var _n0 = match.eT;
	if ((((((_n0.b && (!_n0.a.$)) && _n0.b.b) && (!_n0.b.a.$)) && _n0.b.b.b) && _n0.b.b.b.b) && (!_n0.b.b.b.b.b)) {
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
					aU: delimiter,
					u: elm$core$String$length(indentString) + 1,
					_: false,
					O: pablohirafuji$elm_markdown$Markdown$Block$Unordered
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
		var _n0 = match.eT;
		if (_n0.b && (!_n0.a.$)) {
			var fenceStr = _n0.a.a;
			return (_Utils_cmp(
				elm$core$String$length(fenceStr),
				fence.b_) > -1) && _Utils_eq(
				A2(elm$core$String$left, 1, fenceStr),
				fence.bZ);
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
			previousCode + (A2(pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, fence.u, rawLine) + '\n'));
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
						case 0:
							if (!item.b.b) {
								return false;
							} else {
								return true;
							}
						case 6:
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
		if (!result.$) {
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
							return $.ei;
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
						return $.eT;
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
					case 3:
						if ((ast.a.a.$ === 1) && ast.a.a.a) {
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
					case 6:
						var _n14 = ast.a;
						var model = _n14.a;
						var items = _n14.b;
						var astTail = ast.b;
						return (_Utils_cmp(
							pablohirafuji$elm_markdown$Markdown$Helpers$indentLength(rawLine),
							model.u) > -1) ? A5(pablohirafuji$elm_markdown$Markdown$Block$parseIndentedListLine, rawLine, model, items, ast, astTail) : A2(
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
		if (ast.b && (ast.a.$ === 5)) {
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
							A2(pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, model.u, rawLine)))));
		} else {
			var item = items.a;
			var itemsTail = items.b;
			var indentedRawLine = A2(pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, model.u, rawLine);
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
						case 0:
							if (!item.b.b) {
								return updateList(model);
							} else {
								var itemTail = item.b;
								return A2(
									elm$core$List$all,
									function (block) {
										if (!block.$) {
											return true;
										} else {
											return false;
										}
									},
									itemTail) ? A2(pablohirafuji$elm_markdown$Markdown$Block$parseRawLine, rawLine, ast) : updateList(
									_Utils_update(
										model,
										{_: true}));
							}
						case 6:
							var _n9 = item.a;
							var model_ = _n9.a;
							var items_ = _n9.b;
							var itemTail = item.b;
							return (_Utils_cmp(
								pablohirafuji$elm_markdown$Markdown$Helpers$indentLength(indentedRawLine),
								model_.u) > -1) ? updateList(model) : (pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast(items_) ? updateList(
								_Utils_update(
									model,
									{_: true})) : updateList(model));
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
					case 6:
						var _n2 = ast.a;
						var model = _n2.a;
						var items = _n2.b;
						var astTail = ast.b;
						return _Utils_eq(listBlock.aU, model.aU) ? function (a) {
							return A2(elm$core$List$cons, a, astTail);
						}(
							A2(
								pablohirafuji$elm_markdown$Markdown$Block$List,
								_Utils_update(
									model,
									{
										u: listBlock.u,
										_: model._ || pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast(items)
									}),
								A2(elm$core$List$cons, parsedRawLine, items))) : newList;
					case 4:
						var _n3 = ast.a;
						var rawText = _n3.a;
						var inlines = _n3.b;
						var astTail = ast.b;
						if ((parsedRawLine.b && (!parsedRawLine.a.$)) && (!parsedRawLine.b.b)) {
							return A2(
								elm$core$List$cons,
								A2(pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, rawText, rawLine),
								astTail);
						} else {
							var _n5 = listBlock.O;
							if (_n5.$ === 1) {
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
		return {$: 8, a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$Block$PlainInlines = function (a) {
	return {$: 7, a: a};
};
var pablohirafuji$elm_markdown$Markdown$Config$Sanitize = function (a) {
	return {$: 1, a: a};
};
var pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlAttributes = _List_fromArray(
	['name', 'class']);
var pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlElements = _List_fromArray(
	['address', 'article', 'aside', 'b', 'blockquote', 'br', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'dd', 'details', 'div', 'dl', 'dt', 'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'legend', 'li', 'menu', 'menuitem', 'nav', 'ol', 'optgroup', 'option', 'p', 'pre', 'section', 'strike', 'summary', 'small', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']);
var pablohirafuji$elm_markdown$Markdown$Config$defaultSanitizeOptions = {co: pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlAttributes, cp: pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlElements};
var pablohirafuji$elm_markdown$Markdown$Config$defaultOptions = {
	c0: pablohirafuji$elm_markdown$Markdown$Config$Sanitize(pablohirafuji$elm_markdown$Markdown$Config$defaultSanitizeOptions),
	eK: false
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$initParser = F3(
	function (options, refs, rawText) {
		return {f: _List_Nil, a3: options, y: rawText, cc: refs, l: _List_Nil};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$CodeInline = function (a) {
	return {$: 2, a: a};
};
var pablohirafuji$elm_markdown$Markdown$Inline$HardLineBreak = {$: 1};
var pablohirafuji$elm_markdown$Markdown$Inline$HtmlInline = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$Image = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$Link = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var pablohirafuji$elm_markdown$Markdown$Inline$Text = function (a) {
	return {$: 0, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$matchToInline = function (_n0) {
	var match = _n0;
	var _n1 = match.O;
	switch (_n1.$) {
		case 0:
			return pablohirafuji$elm_markdown$Markdown$Inline$Text(match.ar);
		case 1:
			return pablohirafuji$elm_markdown$Markdown$Inline$HardLineBreak;
		case 2:
			return pablohirafuji$elm_markdown$Markdown$Inline$CodeInline(match.ar);
		case 3:
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
		case 4:
			var _n3 = _n1.a;
			var url = _n3.a;
			var maybeTitle = _n3.b;
			return A3(
				pablohirafuji$elm_markdown$Markdown$Inline$Link,
				url,
				maybeTitle,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.f));
		case 5:
			var _n4 = _n1.a;
			var url = _n4.a;
			var maybeTitle = _n4.b;
			return A3(
				pablohirafuji$elm_markdown$Markdown$Inline$Image,
				url,
				maybeTitle,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.f));
		case 6:
			var model = _n1.a;
			return A3(
				pablohirafuji$elm_markdown$Markdown$Inline$HtmlInline,
				model.G,
				model.b,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.f));
		default:
			var length = _n1.a;
			return A2(
				pablohirafuji$elm_markdown$Markdown$Inline$Emphasis,
				length,
				pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.f));
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines = function (matches) {
	return A2(elm$core$List$map, pablohirafuji$elm_markdown$Markdown$InlineParser$matchToInline, matches);
};
var elm$core$List$sortBy = _List_sortBy;
var pablohirafuji$elm_markdown$Markdown$InlineParser$Match = elm$core$Basics$identity;
var pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch = F2(
	function (parentMatch, childMatch) {
		return _Utils_update(
			childMatch,
			{cC: childMatch.cC - parentMatch.N, cf: childMatch.cf - parentMatch.N, aM: childMatch.aM - parentMatch.N, N: childMatch.N - parentMatch.N});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$addChild = F2(
	function (parentMatch, childMatch) {
		return _Utils_update(
			parentMatch,
			{
				f: A2(
					elm$core$List$cons,
					A2(pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch, parentMatch, childMatch),
					parentMatch.f)
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatch = F2(
	function (_n0, matches) {
		var match = _n0;
		if (!matches.b) {
			return _List_fromArray(
				[match]);
		} else {
			var prevMatch = matches.a;
			var matchesTail = matches.b;
			return (_Utils_cmp(prevMatch.cC, match.cf) < 1) ? A2(elm$core$List$cons, match, matches) : (((_Utils_cmp(prevMatch.cf, match.cf) < 0) && (_Utils_cmp(prevMatch.cC, match.cC) > 0)) ? A2(
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
				var match = _n0;
				return match.cf;
			}),
		A2(
			elm$core$Basics$composeR,
			A2(elm$core$List$foldl, pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatch, _List_Nil),
			elm$core$List$map(
				function (_n1) {
					var match = _n1;
					return _Utils_update(
						match,
						{
							f: pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches()(match.f)
						});
				})));
}
var pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches = pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches();
pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches = function () {
	return pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches;
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$organizeParserMatches = function (model) {
	return _Utils_update(
		model,
		{
			f: pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches(model.f)
		});
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType = {$: 0};
var pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch = function (text) {
	return {
		cC: 0,
		f: _List_Nil,
		cf: 0,
		ar: pablohirafuji$elm_markdown$Markdown$Helpers$formatStr(text),
		aM: 0,
		N: 0,
		O: pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType
	};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatch = F3(
	function (rawText, _n2, parsedMatches) {
		var matchModel = _n2;
		var updtMatch = _Utils_update(
			matchModel,
			{
				f: A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches, matchModel.ar, _List_Nil, matchModel.f)
			});
		if (!parsedMatches.b) {
			var finalStr = A2(elm$core$String$dropLeft, matchModel.cC, rawText);
			return elm$core$String$isEmpty(finalStr) ? _List_fromArray(
				[updtMatch]) : _List_fromArray(
				[
					updtMatch,
					pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(finalStr)
				]);
		} else {
			var matchHead = parsedMatches.a;
			var matchesTail = parsedMatches.b;
			return _Utils_eq(matchHead.O, pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType) ? A2(elm$core$List$cons, updtMatch, parsedMatches) : (_Utils_eq(matchModel.cC, matchHead.cf) ? A2(elm$core$List$cons, updtMatch, parsedMatches) : ((_Utils_cmp(matchModel.cC, matchHead.cf) < 0) ? A2(
				elm$core$List$cons,
				updtMatch,
				A2(
					elm$core$List$cons,
					pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(
						A3(elm$core$String$slice, matchModel.cC, matchHead.cf, rawText)),
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
					var matchModel = parsedMatches.a;
					return (matchModel.cf > 0) ? A2(
						elm$core$List$cons,
						pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(
							A2(elm$core$String$left, matchModel.cf, rawText)),
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
			f: A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches, model.y, _List_Nil, model.f)
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
	return {$: 3, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketLToken = function (regMatch) {
	var _n0 = regMatch.eT;
	if ((_n0.b && _n0.b.b) && (!_n0.b.a.$)) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var delimiter = _n1.a.a;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? elm$core$Maybe$Just(
			{
				d9: regMatch.d9 + backslashesLength,
				g: 1,
				j: pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken('<')
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
	return {$: 4, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketRToken = function (regMatch) {
	var _n0 = regMatch.eT;
	if ((_n0.b && _n0.b.b) && (!_n0.b.a.$)) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return elm$core$Maybe$Just(
			{
				d9: regMatch.d9 + backslashesLength,
				g: 1,
				j: pablohirafuji$elm_markdown$Markdown$InlineParser$RightAngleBracket(
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
		return {$: 6, a: a, b: b};
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
		var _n0 = regMatch.eT;
		if ((((_n0.b && _n0.b.b) && _n0.b.b.b) && (!_n0.b.b.a.$)) && _n0.b.b.b.b) {
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
			var mLeftFringe = (regMatch.d9 && (!leftFringeLength)) ? elm$core$Maybe$Just(
				A3(elm$core$String$slice, regMatch.d9 - 1, regMatch.d9, rawText)) : maybeLeftFringe;
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
			var index = ((regMatch.d9 + backslashesLength) + leftFringeLength) + (isEscaped ? 1 : 0);
			return ((delimiterLength <= 0) || ((_char === '_') && _Utils_eq(
				fringeRank,
				_Utils_Tuple2(2, 2)))) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
				{
					d9: index,
					g: delimiterLength,
					j: A2(pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisToken, _char, fringeRank)
				});
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$findAsteriskEmphasisTokens = function (str) {
	return A2(
		elm$core$List$filterMap,
		A2(pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken, '*', str),
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$asteriskEmphasisTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$codeTokenRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\\\*)(\\`+)'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken = function (a) {
	return {$: 0, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToCodeToken = function (regMatch) {
	var _n0 = regMatch.eT;
	if ((_n0.b && _n0.b.b) && (!_n0.b.a.$)) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var backtick = _n1.a.a;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return elm$core$Maybe$Just(
			{
				d9: regMatch.d9 + backslashesLength,
				g: elm$core$String$length(backtick),
				j: pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken(
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
var pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken = {$: 8};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToHardBreakToken = function (regMatch) {
	var _n0 = regMatch.eT;
	_n0$2:
	while (true) {
		if (_n0.b) {
			if (!_n0.a.$) {
				var backslashes = _n0.a.a;
				var backslashesLength = elm$core$String$length(backslashes);
				return (!pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength)) ? elm$core$Maybe$Just(
					{d9: (regMatch.d9 + backslashesLength) - 1, g: 2, j: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken}) : elm$core$Maybe$Nothing;
			} else {
				if (_n0.b.b && (!_n0.b.a.$)) {
					var _n1 = _n0.b;
					return elm$core$Maybe$Just(
						{
							d9: regMatch.d9,
							g: elm$core$String$length(regMatch.ei),
							j: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken
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
	var _n0 = regMatch.eT;
	_n0$2:
	while (true) {
		if (_n0.b) {
			if (!_n0.a.$) {
				var backslashes = _n0.a.a;
				var backslashesLength = elm$core$String$length(backslashes);
				return pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? elm$core$Maybe$Just(
					{d9: regMatch.d9 + backslashesLength, g: 1, j: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken}) : elm$core$Maybe$Just(
					{d9: (regMatch.d9 + backslashesLength) - 1, g: 2, j: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken});
			} else {
				if (_n0.b.b) {
					var _n1 = _n0.b;
					var maybeSpaces = _n1.a;
					return elm$core$Maybe$Just(
						{
							d9: regMatch.d9,
							g: elm$core$String$length(regMatch.ei),
							j: pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken
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
	var _n0 = regMatch.eT;
	if ((_n0.b && _n0.b.b) && (!_n0.b.a.$)) {
		var maybeBackslashes = _n0.a;
		var _n1 = _n0.b;
		var delimiter = _n1.a.a;
		var backslashesLength = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Maybe$map, elm$core$String$length, maybeBackslashes));
		return pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? elm$core$Maybe$Just(
			{
				d9: regMatch.d9 + backslashesLength,
				g: 1,
				j: pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken(']')
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
var pablohirafuji$elm_markdown$Markdown$InlineParser$ImageOpenToken = {$: 2};
var pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken = function (a) {
	return {$: 1, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageOpenToken = function (regMatch) {
	var _n0 = regMatch.eT;
	if (((_n0.b && _n0.b.b) && _n0.b.b.b) && (!_n0.b.b.a.$)) {
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
		var index = (regMatch.d9 + backslashesLength) + ((isEscaped && _Utils_eq(
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
			return {d9: index, g: length, j: m};
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
		A2(pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken, '_', str),
		A2(elm$regex$Regex$find, pablohirafuji$elm_markdown$Markdown$InlineParser$underlineEmphasisTokenRegex, str));
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$tokenize = function (model) {
	return _Utils_update(
		model,
		{
			l: A2(
				elm$core$List$sortBy,
				function ($) {
					return $.d9;
				},
				_Utils_ap(
					pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketRTokens(model.y),
					_Utils_ap(
						pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketLTokens(model.y),
						_Utils_ap(
							A2(pablohirafuji$elm_markdown$Markdown$InlineParser$findHardBreakTokens, model.a3.eK, model.y),
							_Utils_ap(
								pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageCloseTokens(model.y),
								_Utils_ap(
									pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageOpenTokens(model.y),
									_Utils_ap(
										pablohirafuji$elm_markdown$Markdown$InlineParser$findUnderlineEmphasisTokens(model.y),
										_Utils_ap(
											pablohirafuji$elm_markdown$Markdown$InlineParser$findAsteriskEmphasisTokens(model.y),
											pablohirafuji$elm_markdown$Markdown$InlineParser$findCodeTokens(model.y)))))))))
		});
};
var elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
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
var pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType = {$: 2};
var pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisType = function (a) {
	return {$: 7, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType = function (a) {
	return {$: 6, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType = function (a) {
	return {$: 5, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType = function (a) {
	return {$: 4, a: a};
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch = F2(
	function (model, match) {
		return _Utils_update(
			model,
			{
				f: A2(elm$core$List$cons, match, model.f)
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$addToken = F2(
	function (model, token) {
		return _Utils_update(
			model,
			{
				l: A2(elm$core$List$cons, token, model.l)
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM = F2(
	function (finderFunction, model) {
		return finderFunction(
			_Utils_Tuple2(
				model.l,
				_Utils_update(
					model,
					{l: _List_Nil})));
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType = function (a) {
	return {$: 3, a: a};
};
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
				match.ei,
				elm$url$Url$percentDecode(match.ei));
		}));
var pablohirafuji$elm_markdown$Markdown$InlineParser$urlRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^([A-Za-z][A-Za-z0-9.+\\-]{1,31}:[^<>\\x00-\\x20]*)$'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$autolinkToMatch = function (_n0) {
	var match = _n0;
	return A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$InlineParser$urlRegex, match.ar) ? elm$core$Result$Ok(
		_Utils_update(
			match,
			{
				O: pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType(
					_Utils_Tuple2(
						match.ar,
						pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(match.ar)))
			})) : elm$core$Result$Err(match);
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
			if (!maybeFound.$) {
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
		var _n0 = regexMatch.eT;
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
				return _Utils_update(
					matchModel,
					{
						cC: matchModel.cC + elm$core$String$length(regexMatch.ei),
						O: function () {
							var _n5 = matchModel.O;
							if (_n5.$ === 5) {
								return pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType;
							} else {
								return pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType;
							}
						}()(
							pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle(
								_Utils_Tuple2(rawUrl, maybeTitle)))
					});
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
	var tempMatch = _n0.b;
	var model = _n0.c;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple3(remainText, tempMatch, model),
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
						return $.ei;
					},
					elm$core$String$length),
				maybeRegexMatch));
		var toMatch = function (urlTitle) {
			return _Utils_update(
				matchModel,
				{
					cC: matchModel.cC + regexMatchLength,
					O: function () {
						var _n0 = matchModel.O;
						if (_n0.$ === 5) {
							return pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType;
						} else {
							return pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType;
						}
					}()(
						pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle(urlTitle))
				});
		};
		var refLabel = function (str) {
			return elm$core$String$isEmpty(str) ? matchModel.ar : str;
		}(
			A2(
				elm$core$Maybe$withDefault,
				matchModel.ar,
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
									return $.eT;
								},
								elm$core$List$head),
							maybeRegexMatch)))));
		var maybeRefItem = A2(
			elm$core$Dict$get,
			pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel(refLabel),
			model.cc);
		return A2(elm$core$Maybe$map, toMatch, maybeRefItem);
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType = function (_n0) {
	var remainText = _n0.a;
	var tempMatch = _n0.b;
	var model = _n0.c;
	return A2(
		elm$core$Result$fromMaybe,
		_Utils_Tuple3(remainText, tempMatch, model),
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
	var _n0 = parser.f;
	if (!_n0.b) {
		return elm$core$Result$Err(0);
	} else {
		var match = _n0.a;
		var remainMatches = _n0.b;
		var overlappingMatches = A2(
			elm$core$List$filter,
			function (_n1) {
				var testMatch = _n1;
				return (_Utils_cmp(match.cC, testMatch.cf) > 0) && (_Utils_cmp(match.cC, testMatch.cC) < 0);
			},
			remainMatches);
		return (elm$core$List$isEmpty(remainMatches) || elm$core$List$isEmpty(overlappingMatches)) ? elm$core$Result$Ok(parser) : elm$core$Result$Err(0);
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$emailRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^([a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~\\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?)*)$'));
var pablohirafuji$elm_markdown$Markdown$InlineParser$emailAutolinkTypeToMatch = function (_n0) {
	var match = _n0;
	return A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$InlineParser$emailRegex, match.ar) ? elm$core$Result$Ok(
		_Utils_update(
			match,
			{
				O: pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType(
					_Utils_Tuple2(
						match.ar,
						'mailto:' + pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(match.ar)))
			})) : elm$core$Result$Err(match);
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$filterTokens = F2(
	function (filter, model) {
		return _Utils_update(
			model,
			{
				l: A2(elm$core$List$filter, filter, model.l)
			});
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$findToken = F2(
	function (isToken, tokens) {
		var search = F2(
			function (token, _n2) {
				var maybeToken = _n2.a;
				var innerTokens = _n2.b;
				var remainTokens = _n2.c;
				if (maybeToken.$ === 1) {
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
		return {b: attributes, G: tag};
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlToken = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$attributesFromRegex = function (regexMatch) {
	var _n0 = regexMatch.eT;
	_n0$2:
	while (true) {
		if (_n0.b && (!_n0.a.$)) {
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
		var _n0 = regexMatch.eT;
		if ((((_n0.b && _n0.b.b) && (!_n0.b.a.$)) && _n0.b.b.b) && _n0.b.b.b.b) {
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
						d9: match.cf,
						g: match.cC - match.cf,
						j: A2(
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
			var _n4 = model.a3.c0;
			switch (_n4.$) {
				case 0:
					return noAttributesInCloseTag ? elm$core$Maybe$Just(
						updateModel(attributes)) : elm$core$Maybe$Nothing;
				case 1:
					var allowedHtmlElements = _n4.a.cp;
					var allowedHtmlAttributes = _n4.a.co;
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
		var match = _n0;
		var _n1 = model.a3.c0;
		if (_n1.$ === 2) {
			return elm$core$Maybe$Nothing;
		} else {
			return A2(
				elm$core$Maybe$andThen,
				A2(pablohirafuji$elm_markdown$Markdown$InlineParser$htmlFromRegex, model, match),
				elm$core$List$head(
					A3(elm$regex$Regex$findAtMost, 1, pablohirafuji$elm_markdown$Markdown$InlineParser$htmlRegex, match.ar)));
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$isCloseToken = F2(
	function (htmlModel, token) {
		var _n0 = token.j;
		if ((_n0.$ === 5) && (!_n0.a)) {
			var htmlModel_ = _n0.b;
			return _Utils_eq(htmlModel.G, htmlModel_.G);
		} else {
			return false;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$isCodeTokenPair = F2(
	function (closeToken, openToken) {
		var _n0 = openToken.j;
		if (!_n0.$) {
			var isEscaped = _n0.a;
			return isEscaped ? _Utils_eq(openToken.g - 1, closeToken.g) : _Utils_eq(openToken.g, closeToken.g);
		} else {
			return false;
		}
	});
var pablohirafuji$elm_markdown$Markdown$InlineParser$isLinkTypeOrImageOpenToken = function (token) {
	var _n0 = token.j;
	switch (_n0.$) {
		case 1:
			return true;
		case 2:
			return true;
		default:
			return false;
	}
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$isOpenEmphasisToken = F2(
	function (closeToken, openToken) {
		var _n0 = openToken.j;
		if (_n0.$ === 6) {
			var openChar = _n0.a;
			var _n1 = _n0.b;
			var openLR = _n1.a;
			var openRR = _n1.b;
			var _n2 = closeToken.j;
			if (_n2.$ === 6) {
				var closeChar = _n2.a;
				var _n3 = _n2.b;
				var closeLR = _n3.a;
				var closeRR = _n3.b;
				return _Utils_eq(openChar, closeChar) ? ((_Utils_eq(openLR, openRR) || _Utils_eq(closeLR, closeRR)) ? A2(elm$core$Basics$modBy, 3, closeToken.g + openToken.g) : true) : false;
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
	return A2(elm$core$List$member, htmlModel.G, pablohirafuji$elm_markdown$Markdown$InlineParser$voidHtmlTags);
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakType = {$: 1};
var pablohirafuji$elm_markdown$Markdown$InlineParser$SoftLineBreakToken = {$: 7};
var pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens = function (model) {
	return _Utils_update(
		model,
		{
			l: elm$core$List$reverse(model.l)
		});
};
var pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch = F2(
	function (token, type_) {
		return {cC: token.d9 + token.g, f: _List_Nil, cf: token.d9, ar: '', aM: 0, N: 0, O: type_};
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
			if (_Utils_eq(token.j, pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken) || (_Utils_eq(token.j, pablohirafuji$elm_markdown$Markdown$InlineParser$SoftLineBreakToken) && model.a3.eK)) {
				return pablohirafuji$elm_markdown$Markdown$InlineParser$lineBreakTTM(
					function (b) {
						return _Utils_Tuple2(tokensTail, b);
					}(
						_Utils_update(
							model,
							{
								f: A2(
									elm$core$List$cons,
									A2(pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch, token, pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakType),
									model.f)
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
		var _n0 = parser.f;
		if (!_n0.b) {
			return _Utils_Tuple2(tokensTail, parser);
		} else {
			var match = _n0.a;
			return _Utils_Tuple2(
				A2(
					elm$core$List$filter,
					function (token) {
						return _Utils_cmp(token.d9, match.cC) > -1;
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
			if (result.$ === 1) {
				var tempMatch = result.a;
				return (!isEscaped) ? A2(
					pablohirafuji$elm_markdown$Markdown$InlineParser$htmlToToken,
					_Utils_update(
						model,
						{l: remainTokens}),
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
							f: A2(elm$core$List$cons, newMatch, model.f),
							l: remainTokens
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
			var _n23 = token.j;
			switch (_n23.$) {
				case 0:
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
										model.l)))));
				case 4:
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
										return $.j;
									},
									elm$core$Basics$neq(
										pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken('<'))),
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
													return $.j;
												},
												elm$core$Basics$eq(
													pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken('<'))),
											model.l))))));
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
			openToken.j,
			pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken(true)) ? _Utils_update(
			openToken,
			{d9: openToken.d9 + 1, g: openToken.g - 1}) : openToken;
		return _Utils_update(
			model,
			{
				f: A2(
					elm$core$List$cons,
					A6(pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch, model, pablohirafuji$elm_markdown$Markdown$Helpers$cleanWhitespaces, pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType, updtOpenToken, closeToken, _List_Nil),
					model.f),
				l: remainTokens
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
			var _n18 = token.j;
			if (_n18.$ === 6) {
				var _char = _n18.a;
				var _n19 = _n18.b;
				var leftRank = _n19.a;
				var rightRank = _n19.b;
				if (_Utils_eq(leftRank, rightRank)) {
					if (rightRank && ((_char !== '_') || (rightRank === 1))) {
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
										model.l))));
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
										model.l))));
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
		var remainLength = openToken.g - closeToken.g;
		var updt = (!remainLength) ? {bk: closeToken, a2: openToken, bA: remainTokens, bI: tokensTail} : ((remainLength > 0) ? {
			bk: closeToken,
			a2: _Utils_update(
				openToken,
				{d9: openToken.d9 + remainLength, g: closeToken.g}),
			bA: A2(
				elm$core$List$cons,
				_Utils_update(
					openToken,
					{g: remainLength}),
				remainTokens),
			bI: tokensTail
		} : {
			bk: _Utils_update(
				closeToken,
				{g: openToken.g}),
			a2: openToken,
			bA: remainTokens,
			bI: A2(
				elm$core$List$cons,
				_Utils_update(
					closeToken,
					{d9: closeToken.d9 + openToken.g, g: -remainLength}),
				tokensTail)
		});
		var match = A6(
			pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
			model,
			function (s) {
				return s;
			},
			pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisType(updt.a2.g),
			updt.a2,
			updt.bk,
			elm$core$List$reverse(innerTokens));
		return _Utils_Tuple2(
			updt.bI,
			_Utils_update(
				model,
				{
					f: A2(elm$core$List$cons, match, model.f),
					l: updt.bA
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
			var _n14 = token.j;
			if (_n14.$ === 5) {
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
					f: A2(
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
						model.f)
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
			var _n10 = token.j;
			if ((_n10.$ === 3) && (']' === _n10.a)) {
				return pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageTypeTTM(
					A2(
						elm$core$Maybe$withDefault,
						_Utils_Tuple2(tokensTail, model),
						A2(
							elm$core$Maybe$andThen,
							A3(pablohirafuji$elm_markdown$Markdown$InlineParser$linkOrImageTypeToMatch, token, tokensTail, model),
							A2(pablohirafuji$elm_markdown$Markdown$InlineParser$findToken, pablohirafuji$elm_markdown$Markdown$InlineParser$isLinkTypeOrImageOpenToken, model.l))));
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
					l: _Utils_ap(innerTokens, remainTokens)
				}));
		var remainText = A2(elm$core$String$dropLeft, closeToken.d9 + 1, model.y);
		var linkOpenTokenToInactive = function (model_) {
			var process = function (token) {
				var _n7 = token.j;
				if (_n7.$ === 1) {
					return _Utils_update(
						token,
						{
							j: pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken(false)
						});
				} else {
					return token;
				}
			};
			return _Utils_update(
				model_,
				{
					l: A2(elm$core$List$map, process, model_.l)
				});
		};
		var args = function (isLinkType) {
			return _Utils_Tuple3(
				remainText,
				tempMatch(isLinkType),
				_Utils_update(
					model,
					{l: remainTokens}));
		};
		var _n2 = openToken.j;
		switch (_n2.$) {
			case 2:
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
										return 0;
									},
									A2(
										pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
										pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType,
										pablohirafuji$elm_markdown$Markdown$InlineParser$checkForInlineLinkTypeOrImageType(
											args(false))))))));
			case 1:
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
												return 0;
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
		var textStart = openToken.d9 + openToken.g;
		var textEnd = closeToken.d9;
		var start = openToken.d9;
		var end = closeToken.d9 + closeToken.g;
		var match = {
			cC: end,
			f: _List_Nil,
			cf: start,
			ar: processText(
				A3(elm$core$String$slice, textStart, textEnd, model.y)),
			aM: textEnd,
			N: textStart,
			O: type_
		};
		var matches = A2(
			elm$core$List$map,
			function (_n0) {
				var matchModel = _n0;
				return A2(pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch, match, matchModel);
			},
			pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches()(
				_Utils_update(
					model,
					{f: _List_Nil, l: innerTokens})).f);
		return _Utils_update(
			match,
			{f: matches});
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
var pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches = pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches();
pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches = function () {
	return pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches;
};
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
								elm$core$String$trim(rawText)))))).f);
	});
var pablohirafuji$elm_markdown$Markdown$Block$parseInline = F4(
	function (maybeOptions, textAsParagraph, refs, block) {
		var options = A2(elm$core$Maybe$withDefault, pablohirafuji$elm_markdown$Markdown$Config$defaultOptions, maybeOptions);
		switch (block.$) {
			case 2:
				var rawText = block.a;
				var lvl = block.b;
				return A3(
					pablohirafuji$elm_markdown$Markdown$Block$Heading,
					rawText,
					lvl,
					A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parse, options, refs, rawText));
			case 4:
				var rawText = block.a;
				var inlines = A3(pablohirafuji$elm_markdown$Markdown$InlineParser$parse, options, refs, rawText);
				if ((inlines.b && (inlines.a.$ === 5)) && (!inlines.b.b)) {
					var _n3 = inlines.a;
					return pablohirafuji$elm_markdown$Markdown$Block$PlainInlines(inlines);
				} else {
					return textAsParagraph ? A2(pablohirafuji$elm_markdown$Markdown$Block$Paragraph, rawText, inlines) : pablohirafuji$elm_markdown$Markdown$Block$PlainInlines(inlines);
				}
			case 5:
				var blocks = block.a;
				return pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(
					A3(
						pablohirafuji$elm_markdown$Markdown$Block$parseInlines,
						maybeOptions,
						true,
						_Utils_Tuple2(refs, blocks)));
			case 6:
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
							A2(pablohirafuji$elm_markdown$Markdown$Block$parseInlines, maybeOptions, model._),
							function (b) {
								return _Utils_Tuple2(refs, b);
							})));
			case 8:
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
var pablohirafuji$elm_markdown$Markdown$Block$dropRefString = F2(
	function (rawText, inlineMatch) {
		var strippedText = A2(elm$core$String$dropLeft, inlineMatch.b2, rawText);
		return A2(elm$regex$Regex$contains, pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, strippedText) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(strippedText);
	});
var pablohirafuji$elm_markdown$Markdown$Block$insertLinkMatch = F2(
	function (refs, linkMatch) {
		return A2(elm$core$Dict$member, linkMatch.aj, refs) ? refs : A3(
			elm$core$Dict$insert,
			linkMatch.aj,
			_Utils_Tuple2(linkMatch.bf, linkMatch.b3),
			refs);
	});
var pablohirafuji$elm_markdown$Markdown$Block$extractUrlTitleRegex = function (regexMatch) {
	var _n0 = regexMatch.eT;
	if ((((((_n0.b && (!_n0.a.$)) && _n0.b.b) && _n0.b.b.b) && _n0.b.b.b.b) && _n0.b.b.b.b.b) && _n0.b.b.b.b.b.b) {
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
				aj: rawText,
				b2: elm$core$String$length(regexMatch.ei),
				b3: pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
					_List_fromArray(
						[maybeTitleSingleQuotes, maybeTitleDoubleQuotes, maybeTitleParenthesis])),
				bf: rawUrl
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
			return ((linkMatch.bf === '') || (linkMatch.aj === '')) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(linkMatch);
		},
		A2(
			elm$core$Maybe$map,
			function (linkMatch) {
				return _Utils_update(
					linkMatch,
					{
						aj: pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel(linkMatch.aj)
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
			if (!_n0.$) {
				var linkMatch = _n0.a;
				var updtRefs = A2(pablohirafuji$elm_markdown$Markdown$Block$insertLinkMatch, refs, linkMatch);
				var maybeStrippedText = A2(pablohirafuji$elm_markdown$Markdown$Block$dropRefString, rawText, linkMatch);
				if (!maybeStrippedText.$) {
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
			case 4:
				var rawText = block.a;
				var _n2 = A2(pablohirafuji$elm_markdown$Markdown$Block$parseReference, elm$core$Dict$empty, rawText);
				var paragraphRefs = _n2.a;
				var maybeUpdtText = _n2.b;
				var updtRefs = A2(elm$core$Dict$union, paragraphRefs, refs);
				if (!maybeUpdtText.$) {
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
			case 6:
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
			case 5:
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
			case 8:
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
var author$project$DocumentView$viewMarkdown = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		mdgriffith$stylish_elephants$Element$html(
			author$project$MarkdownTools$view(document.az)));
};
var author$project$DocumentView$normalize = function (str) {
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
var author$project$DocumentView$prependMacros = F2(
	function (macros_, sourceText) {
		var macros__ = author$project$DocumentView$normalize(macros_);
		return '$$\n' + (macros__ + ('\n$$\n\n' + sourceText));
	});
var author$project$KVList$keyValueIntHelper = function (tag) {
	var maybeIdString = elm$core$List$head(
		A2(
			elm$core$List$drop,
			1,
			A2(elm$core$String$split, ':', tag)));
	if (maybeIdString.$ === 1) {
		return elm$core$Maybe$Nothing;
	} else {
		var idString = maybeIdString.a;
		return elm$core$String$toInt(idString);
	}
};
var author$project$KVList$intValueForKey = F2(
	function (key, tags) {
		var maybeMacrotag = elm$core$List$head(
			A2(
				elm$core$List$filter,
				function (tag) {
					return A2(elm$core$String$startsWith, key + ':', tag);
				},
				tags));
		var value = function () {
			if (maybeMacrotag.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var tag = maybeMacrotag.a;
				return author$project$KVList$keyValueIntHelper(tag);
			}
		}();
		return value;
	});
var author$project$DocumentView$setCounterText = function (tags) {
	var maybeSectionNumber = A2(author$project$KVList$intValueForKey, 'sectionNumber', tags);
	if (maybeSectionNumber.$ === 1) {
		return '';
	} else {
		var sectionNumber = maybeSectionNumber.a;
		return '\\setcounter{section}{' + (elm$core$String$fromInt(sectionNumber) + '}\n\n');
	}
};
var elm$html$Html$Keyed$node = elm$virtual_dom$VirtualDom$keyedNode;
var jxxcarlson$meenylatex$MeenyLatex$MiniLatex$getRenderedText = function (editRecord) {
	var paragraphs = editRecord.bB;
	var ids = editRecord.aE;
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
};
var jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord = F6(
	function (paragraphs, renderedParagraphs, latexState, idList, newIdsStart, newIdsEnd) {
		return {aE: idList, eg: latexState, bw: newIdsEnd, bx: newIdsStart, b8: paragraphs, bB: renderedParagraphs};
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
var jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState = {ag: jxxcarlson$meenylatex$MeenyLatex$LatexState$initialCounters, cz: elm$core$Dict$empty, cB: elm$core$Dict$empty, db: _List_Nil};
var jxxcarlson$meenylatex$MeenyLatex$Differ$emptyEditRecordHtmlMsg = A6(jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord, _List_Nil, _List_Nil, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, _List_Nil, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing);
var jxxcarlson$meenylatex$MeenyLatex$Differ$isEmpty = function (editRecord) {
	return _Utils_eq(editRecord.b8, _List_Nil) && _Utils_eq(editRecord.bB, _List_Nil);
};
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$LatexInfo = F4(
	function (typ, name, options, value) {
		return {ek: name, a3: options, av: typ, U: value};
	});
var jxxcarlson$meenylatex$MeenyLatex$Accumulator$info = function (latexExpression) {
	switch (latexExpression.$) {
		case 6:
			var name = latexExpression.a;
			var optArgs = latexExpression.b;
			var args = latexExpression.c;
			return {ek: name, a3: optArgs, av: 'macro', U: args};
		case 5:
			var name = latexExpression.a;
			var optArgs = latexExpression.b;
			var args = latexExpression.c;
			var body = latexExpression.d;
			return {ek: name, a3: optArgs, av: 'smacro', U: args};
		case 7:
			var name = latexExpression.a;
			var args = latexExpression.b;
			var body = latexExpression.c;
			return {
				ek: name,
				a3: args,
				av: 'env',
				U: _List_fromArray(
					[body])
			};
		default:
			return {ek: 'null', a3: _List_Nil, av: 'null', U: _List_Nil};
	}
};
var jxxcarlson$meenylatex$MeenyLatex$LatexState$setDictionaryItem = F3(
	function (key, value, latexState) {
		var dictionary = latexState.cB;
		var newDictionary = A3(elm$core$Dict$insert, key, value, dictionary);
		return _Utils_update(
			latexState,
			{cB: newDictionary});
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList = function (a) {
	return {$: 8, a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$headLatexExpression = function (list) {
	var he = function () {
		var _n0 = elm$core$List$head(list);
		if (!_n0.$) {
			var expr = _n0.a;
			return expr;
		} else {
			return jxxcarlson$meenylatex$MeenyLatex$Parser$LatexList(_List_Nil);
		}
	}();
	return he;
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$valueOfLXString = function (expr) {
	if (!expr.$) {
		var str = expr.a;
		return str;
	} else {
		return 'Error getting value of LatexString';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$LXString = function (a) {
	return {$: 0, a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$valueOfLatexList = function (latexList) {
	if (latexList.$ === 8) {
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
		var label = jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(latexInfo.U);
		var value = _Utils_eq(latexInfo.a3, _List_Nil) ? label : jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(latexInfo.a3);
		return A3(jxxcarlson$meenylatex$MeenyLatex$LatexState$setDictionaryItem, 'bibitem:' + label, value, latexState);
	});
var jxxcarlson$meenylatex$MeenyLatex$StateReducerHelpers$setDictionaryItemForMacro = F2(
	function (latexInfo, latexState) {
		var value = jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(latexInfo.U);
		return A3(jxxcarlson$meenylatex$MeenyLatex$LatexState$setDictionaryItem, latexInfo.ek, value, latexState);
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$getCounter = F2(
	function (name, latexState) {
		var _n0 = A2(elm$core$Dict$get, name, latexState.ag);
		if (!_n0.$) {
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
		var newCounters = A3(elm$core$Dict$update, name, maybeInc, latexState.ag);
		return _Utils_update(
			latexState,
			{ag: newCounters});
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$setCrossReference = F3(
	function (label, value, latexState) {
		var crossReferences = latexState.cz;
		var newCrossReferences = A3(elm$core$Dict$insert, label, value, crossReferences);
		return _Utils_update(
			latexState,
			{cz: newCrossReferences});
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$Macro = F3(
	function (a, b, c) {
		return {$: 6, a: a, b: b, c: c};
	});
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {cw: col, cZ: problem, c4: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.c4, p.cw, p.cZ);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
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
		var parse = _n0;
		var _n1 = parse(
			{cw: 1, i: _List_Nil, k: 1, c: 0, c4: 1, eN: src});
		if (!_n1.$) {
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
		if (!_n0.$) {
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
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
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
		};
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
	return function (s) {
		var _n0 = thunk(0);
		var parse = _n0;
		return parse(s);
	};
};
var elm$parser$Parser$lazy = elm$parser$Parser$Advanced$lazy;
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
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
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
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
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Problem = F4(
	function (row, col, problem, contextStack) {
		return {cw: col, dQ: contextStack, cZ: problem, c4: row};
	});
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$Problem, s.c4, s.cw, x, s.i));
	});
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.c, s.c4, s.cw, s.eN);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cw: newCol, i: s.i, k: s.k, c: newOffset, c4: newRow, eN: s.eN});
	};
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
	return {$: 3, a: a};
};
var elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return function (s) {
		var _n0 = A5(_Parser_findSubString, str, s.c, s.c4, s.cw, s.eN);
		var newOffset = _n0.a;
		var newRow = _n0.b;
		var newCol = _n0.c;
		var adjustedOffset = (newOffset < 0) ? elm$core$String$length(s.eN) : newOffset;
		return A3(
			elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.c, adjustedOffset) < 0,
			0,
			{cw: newCol, i: s.i, k: s.k, c: adjustedOffset, c4: newRow, eN: s.eN});
	};
};
var elm$parser$Parser$chompUntilEndOr = elm$parser$Parser$Advanced$chompUntilEndOr;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
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
						A3(elm$core$String$slice, s0.c, s1.c, s0.eN),
						a),
					s1);
			}
		};
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
	return !((c === '\\') || ((c === '$') || ((c === '}') || ((c === ' ') || (c === '\n')))));
};
var elm$parser$Parser$UnexpectedChar = {$: 11};
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.c, s.eN);
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cw: 1, i: s.i, k: s.k, c: s.c + 1, c4: s.c4 + 1, eN: s.eN}) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cw: s.cw + 1, i: s.i, k: s.k, c: newOffset, c4: s.c4, eN: s.eN}));
		};
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.eN);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.c, offset) < 0,
					0,
					{cw: col, i: s0.i, k: s0.k, c: offset, c4: row, eN: s0.eN});
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
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.c, s.c4, s.cw, s);
	};
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$parser$Parser$Advanced$getOffset = function (s) {
	return A3(elm$parser$Parser$Advanced$Good, false, s.c, s);
};
var elm$parser$Parser$getOffset = elm$parser$Parser$Advanced$getOffset;
var elm$parser$Parser$Advanced$getSource = function (s) {
	return A3(elm$parser$Parser$Advanced$Good, false, s.eN, s);
};
var elm$parser$Parser$getSource = elm$parser$Parser$Advanced$getSource;
var jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws = elm$parser$Parser$chompWhile(
	function (c) {
		return (c === ' ') || (c === '\n');
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
		var parseA = _n0;
		return function (s0) {
			var _n1 = parseA(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				var _n2 = callback(a);
				var parseB = _n2;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
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
		};
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
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
			var parse = _n0;
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (!step.$) {
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
		return function (s) {
			return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
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
	return {$: 1, a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
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
					elm$parser$Parser$succeed(0))
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
var elm$parser$Parser$ExpectingVariable = {$: 7};
var elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {cw: col, i: context, k: indent, c: offset, c4: row, eN: src};
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
	return function (s) {
		var firstOffset = A3(elm$parser$Parser$Advanced$isSubChar, i.cf, s.c, s.eN);
		if (_Utils_eq(firstOffset, -1)) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, i.cE));
		} else {
			var s1 = _Utils_eq(firstOffset, -2) ? A7(elm$parser$Parser$Advanced$varHelp, i.cK, s.c + 1, s.c4 + 1, 1, s.eN, s.k, s.i) : A7(elm$parser$Parser$Advanced$varHelp, i.cK, firstOffset, s.c4, s.cw + 1, s.eN, s.k, s.i);
			var name = A3(elm$core$String$slice, s.c, s1.c, s.eN);
			return A2(elm$core$Set$member, name, i.c3) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, i.cE)) : A3(elm$parser$Parser$Advanced$Good, true, name, s1);
		}
	};
};
var elm$parser$Parser$variable = function (i) {
	return elm$parser$Parser$Advanced$variable(
		{cE: elm$parser$Parser$ExpectingVariable, cK: i.cK, c3: i.c3, cf: i.cf});
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$macroName = A2(
	elm$parser$Parser$map,
	elm$core$String$dropLeft(1),
	elm$parser$Parser$variable(
		{
			cK: function (c) {
				return elm$core$Char$isAlphaNum(c);
			},
			c3: elm$core$Set$fromList(
				_List_fromArray(
					['\\begin', '\\end', '\\item', '\\bibitem'])),
			cf: function (c) {
				return c === '\\';
			}
		}));
var jxxcarlson$meenylatex$MeenyLatex$Parser$inOptionArgWord = function (c) {
	return !((c === '\\') || ((c === '$') || ((c === ']') || ((c === ' ') || (c === '\n')))));
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
		return c === ' ';
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
var jxxcarlson$meenylatex$MeenyLatex$Parser$arg = jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$arg();
jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$arg = function () {
	return jxxcarlson$meenylatex$MeenyLatex$Parser$arg;
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$latexList2List = function (latexExpression) {
	if (latexExpression.$ === 8) {
		var list = latexExpression.a;
		return list;
	} else {
		return _List_Nil;
	}
};
var jxxcarlson$meenylatex$MeenyLatex$ParserTools$getMacroArgs = F2(
	function (macroName, latexExpression) {
		if (latexExpression.$ === 6) {
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
		if (!head_.$) {
			var value_ = head_.a;
			return value_;
		} else {
			return jxxcarlson$meenylatex$MeenyLatex$Parser$LXString('');
		}
	}();
	if (!value.$) {
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
		if (!arg.$) {
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
	if (!maybeMacro.$) {
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
			elm$core$List$head(info.U));
		var label = function () {
			if (!data.$) {
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
		var newCounters = A3(elm$core$Dict$update, name, maybeSet, latexState.ag);
		return _Utils_update(
			latexState,
			{ag: newCounters});
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
			A2(elm$core$List$map, jxxcarlson$meenylatex$MeenyLatex$ParserTools$latexList2List, info.U));
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
				elm$core$List$head(info.U)));
		var latexState2 = (label !== '') ? A3(
			jxxcarlson$meenylatex$MeenyLatex$LatexState$setCrossReference,
			label,
			elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(tno)),
			latexState1) : latexState1;
		return latexState2;
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$TocEntry = F3(
	function (name, label, level) {
		return {ef: label, aG: level, ek: name};
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexState$addSection = F4(
	function (sectionName, label, level, latexState) {
		var newEntry = A3(jxxcarlson$meenylatex$MeenyLatex$LatexState$TocEntry, sectionName, label, level);
		var toc = _Utils_ap(
			latexState.db,
			_List_fromArray(
				[newEntry]));
		return _Utils_update(
			latexState,
			{db: toc});
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
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(info.U),
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
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(info.U),
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
			jxxcarlson$meenylatex$MeenyLatex$ParserTools$unpackString(info.U),
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
	if (!_n1.$) {
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
			ek: 'setcounter',
			av: 'macro',
			U: _List_fromArray(
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
			_Utils_Tuple2(headElement.av, headElement.ek),
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
	return {$: 9, a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$Environment = F3(
	function (a, b, c) {
		return {$: 7, a: a, b: b, c: c};
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$DisplayMath = function (a) {
	return {$: 4, a: a};
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
		return {$: 2, a: a, b: b};
	});
var jxxcarlson$meenylatex$MeenyLatex$Parser$notSpaceOrSpecialCharacters = function (c) {
	return !((c === ' ') || ((c === '\n') || ((c === '\\') || (c === '$'))));
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
							jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
							jxxcarlson$meenylatex$MeenyLatex$Parser$macro(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws)
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
	return !((c === ' ') || ((c === '\n') || ((c === '\\') || ((c === '$') || (c === '&')))));
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
				jxxcarlson$meenylatex$MeenyLatex$Parser$inlineMath(jxxcarlson$meenylatex$MeenyLatex$ParserHelpers$ws),
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
		return {$: 5, a: a, b: b, c: c, d: d};
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
		cK: function (c) {
			return elm$core$Char$isAlphaNum(c);
		},
		c3: elm$core$Set$fromList(
			_List_fromArray(
				['\\begin', '\\end', '\\item'])),
		cf: function (c) {
			return c === '\\';
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
	return {$: 1, a: a};
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
						elm$parser$Parser$succeed(0),
						elm$parser$Parser$chompIf(
							function (c) {
								return c === '%';
							})),
					elm$parser$Parser$chompWhile(
						function (c) {
							return c !== '\n';
						})),
				elm$parser$Parser$chompIf(
					function (c) {
						return c === '\n';
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
		if (!_n1.$) {
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
var jxxcarlson$meenylatex$MeenyLatex$Parser$environment = jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$environment();
jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$environment = function () {
	return jxxcarlson$meenylatex$MeenyLatex$Parser$environment;
};
var jxxcarlson$meenylatex$MeenyLatex$Parser$latexExpression = jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$latexExpression();
jxxcarlson$meenylatex$MeenyLatex$Parser$cyclic$latexExpression = function () {
	return jxxcarlson$meenylatex$MeenyLatex$Parser$latexExpression;
};
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
	if (!expr.$) {
		if (expr.a.$ === 8) {
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
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start = {$: 0};
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
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Error = {$: 4};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$IgnoreLine = {$: 3};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock = function (a) {
	return {$: 2, a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph = {$: 1};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$BeginBlock = function (a) {
	return {$: 3, a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Blank = {$: 0};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$EndBlock = function (a) {
	return {$: 4, a: a};
};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Ignore = {$: 1};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$Text = {$: 2};
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$getBeginArg = function (line) {
	var parseResult = A2(elm$parser$Parser$run, jxxcarlson$meenylatex$MeenyLatex$Parser$envName, line);
	var arg = function () {
		if (!parseResult.$) {
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
		if (!parseResult.$) {
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
				case 0:
					switch (_n0.b.$) {
						case 0:
							var _n1 = _n0.a;
							var _n2 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start;
						case 2:
							var _n3 = _n0.a;
							var _n4 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 3:
							var _n5 = _n0.a;
							var arg = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 1:
							var _n6 = _n0.a;
							var _n7 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$IgnoreLine;
						default:
							break _n0$15;
					}
				case 3:
					switch (_n0.b.$) {
						case 0:
							var _n8 = _n0.a;
							var _n9 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start;
						case 2:
							var _n10 = _n0.a;
							var _n11 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 3:
							var _n12 = _n0.a;
							var arg = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						default:
							break _n0$15;
					}
				case 2:
					switch (_n0.b.$) {
						case 0:
							var arg = _n0.a.a;
							var _n13 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 2:
							var arg = _n0.a.a;
							var _n14 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 3:
							var arg = _n0.a.a;
							var arg2 = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg);
						case 4:
							var arg1 = _n0.a.a;
							var arg2 = _n0.b.a;
							return _Utils_eq(arg1, arg2) ? jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start : jxxcarlson$meenylatex$MeenyLatex$Paragraph$InBlock(arg1);
						default:
							break _n0$15;
					}
				case 1:
					switch (_n0.b.$) {
						case 2:
							var _n15 = _n0.a;
							var _n16 = _n0.b;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 3:
							var _n17 = _n0.a;
							var str = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 4:
							var _n18 = _n0.a;
							var arg = _n0.b.a;
							return jxxcarlson$meenylatex$MeenyLatex$Paragraph$InParagraph;
						case 0:
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
		var state2 = A2(jxxcarlson$meenylatex$MeenyLatex$Paragraph$nextState, line, parserRecord.o);
		switch (state2.$) {
			case 0:
				return _Utils_update(
					parserRecord,
					{
						Q: '',
						a5: _Utils_ap(
							parserRecord.a5,
							_List_fromArray(
								[
									A2(jxxcarlson$meenylatex$MeenyLatex$Paragraph$joinLines, parserRecord.Q, line)
								])),
						o: state2
					});
			case 1:
				return _Utils_update(
					parserRecord,
					{
						Q: A2(jxxcarlson$meenylatex$MeenyLatex$Paragraph$joinLines, parserRecord.Q, line),
						o: state2
					});
			case 2:
				var arg = state2.a;
				return _Utils_update(
					parserRecord,
					{
						Q: A2(
							jxxcarlson$meenylatex$MeenyLatex$Paragraph$joinLines,
							parserRecord.Q,
							jxxcarlson$meenylatex$MeenyLatex$Paragraph$fixLine(line)),
						o: state2
					});
			case 3:
				return _Utils_update(
					parserRecord,
					{o: state2});
			default:
				return parserRecord;
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Paragraph$logicalParagraphParse = function (text) {
	return A3(
		elm$core$List$foldl,
		jxxcarlson$meenylatex$MeenyLatex$Paragraph$updateParserRecord,
		{Q: '', a5: _List_Nil, o: jxxcarlson$meenylatex$MeenyLatex$Paragraph$Start},
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
				lastState.a5,
				_List_fromArray(
					[lastState.Q]))));
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
			{cz: latexState1.cz, cB: latexState1.cB, db: latexState1.db});
		var _n1 = A2(
			jxxcarlson$meenylatex$MeenyLatex$Accumulator$renderParagraphs(renderer),
			latexState2,
			latexExpressionList);
		var renderedParagraphs = _n1.a;
		return A6(jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord, paragraphs, renderedParagraphs, latexState2, idList, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing);
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$DiffRecord = F4(
	function (commonInitialSegment, commonTerminalSegment, middleSegmentInSource, middleSegmentInTarget) {
		return {bU: commonInitialSegment, bV: commonTerminalSegment, cQ: middleSegmentInSource, b6: middleSegmentInTarget};
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
		var nt = elm$core$List$length(diffRecord.b6);
		var ns = elm$core$List$length(diffRecord.cQ);
		var it = elm$core$List$length(diffRecord.bV);
		var ii = elm$core$List$length(diffRecord.bU);
		var idListTerminal = A2(elm$core$List$drop, ii + ns, editRecord.aE);
		var idListMiddle = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$MeenyLatex$Differ$prefixer(seed),
			A2(elm$core$List$range, ii + 1, ii + nt));
		var idListInitial = A2(elm$core$List$take, ii, editRecord.aE);
		var idList = _Utils_ap(
			idListInitial,
			_Utils_ap(idListMiddle, idListTerminal));
		var _n0 = (!nt) ? _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Maybe$Nothing) : _Utils_Tuple2(
			elm$core$Maybe$Just(ii),
			elm$core$Maybe$Just((ii + nt) - 1));
		var newIdsStart = _n0.a;
		var newIdsEnd = _n0.b;
		return {aE: idList, bw: newIdsEnd, bx: newIdsStart};
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
		var middleSegmentRendered = A2(elm$core$List$map, renderer, diffRecord.b6);
		var it = elm$core$List$length(diffRecord.bV);
		var terminalSegmentRendered = A2(jxxcarlson$meenylatex$MeenyLatex$Differ$takeLast, it, editRecord.bB);
		var ii = elm$core$List$length(diffRecord.bU);
		var initialSegmentRendered = A2(elm$core$List$take, ii, editRecord.bB);
		return _Utils_ap(
			initialSegmentRendered,
			_Utils_ap(middleSegmentRendered, terminalSegmentRendered));
	});
var jxxcarlson$meenylatex$MeenyLatex$Differ$update = F4(
	function (seed, transformer, editRecord, text) {
		var newParagraphs = jxxcarlson$meenylatex$MeenyLatex$Paragraph$logicalParagraphify(text);
		var diffRecord = A2(jxxcarlson$meenylatex$MeenyLatex$Differ$diff, editRecord.b8, newParagraphs);
		var newRenderedParagraphs = A3(jxxcarlson$meenylatex$MeenyLatex$Differ$differentialRender, transformer, diffRecord, editRecord);
		var p = A3(jxxcarlson$meenylatex$MeenyLatex$Differ$differentialIdList, seed, diffRecord, editRecord);
		return A6(jxxcarlson$meenylatex$MeenyLatex$Differ$EditRecord, newParagraphs, newRenderedParagraphs, jxxcarlson$meenylatex$MeenyLatex$LatexState$emptyLatexState, p.aE, p.bx, p.bw);
	});
var jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$update_ = F4(
	function (seed, renderer, editorRecord, text) {
		return A4(
			jxxcarlson$meenylatex$MeenyLatex$Differ$update,
			seed,
			renderer(editorRecord.eg),
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
	var nextInputList_ = A2(elm$core$List$drop, 1, internalState_.aY);
	return {
		bh: elm$core$List$head(
			A2(elm$core$List$drop, 1, nextInputList_)),
		bS: internalState_.bp,
		bp: internalState_.bh,
		aY: nextInputList_
	};
};
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$makeReducer = F3(
	function (computeOutput, input, machineState) {
		var nextInternalState_ = jxxcarlson$meenylatex$MeenyLatex$ListMachine$nextInternalState(machineState.aF);
		var nextInputList = A2(elm$core$List$drop, 1, machineState.aF.aY);
		var newOutput = computeOutput(machineState.aF);
		var outputList = A2(elm$core$List$cons, newOutput, machineState.a4);
		return {aF: nextInternalState_, a4: outputList};
	});
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$initialInternalState = function (inputList) {
	return {
		bh: elm$core$List$head(
			A2(elm$core$List$drop, 1, inputList)),
		bS: elm$core$Maybe$Nothing,
		bp: elm$core$List$head(inputList),
		aY: inputList
	};
};
var jxxcarlson$meenylatex$MeenyLatex$ListMachine$initialMachineState = function (inputList) {
	return {
		aF: jxxcarlson$meenylatex$MeenyLatex$ListMachine$initialInternalState(inputList),
		a4: _List_Nil
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
		return elm$core$List$reverse(finalState.a4);
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
		internalState.bh);
	var b = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(''),
		internalState.bp);
	var a = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(''),
		internalState.bS);
	var _n0 = _Utils_Tuple3(a, b, c);
	if (!_n0.b.$) {
		switch (_n0.a.$) {
			case 6:
				var _n1 = _n0.a;
				var str = _n0.b.a;
				return A2(
					elm$core$List$member,
					jxxcarlson$meenylatex$MeenyLatex$Render2$firstChar(str),
					_List_fromArray(
						['.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(str) : jxxcarlson$meenylatex$MeenyLatex$Parser$LXString(' ' + str);
			case 3:
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
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$NoSpace = 1;
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$Space = 0;
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$firstChar = elm$core$String$left(1);
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$lastChar = elm$core$String$right(1);
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinType = F2(
	function (l, r) {
		var lastCharLeft = jxxcarlson$meenylatex$MeenyLatex$JoinStrings$lastChar(l);
		var firstCharRight = jxxcarlson$meenylatex$MeenyLatex$JoinStrings$firstChar(r);
		return (l === '') ? 1 : (A2(
			elm$core$List$member,
			lastCharLeft,
			_List_fromArray(
				['('])) ? 1 : (A2(
			elm$core$List$member,
			firstCharRight,
			_List_fromArray(
				[')', '.', ',', '?', '!', ';', ':'])) ? 1 : 0));
	});
var jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinDatum2String = F2(
	function (current, datum) {
		var _n0 = datum;
		var acc = _n0.a;
		var previous = _n0.b;
		var _n1 = A2(jxxcarlson$meenylatex$MeenyLatex$JoinStrings$joinType, previous, current);
		if (_n1 === 1) {
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
		case 0:
			var s = cell.a;
			return '<td>' + (s + '</td>');
		case 3:
			var s = cell.a;
			return '<td>$' + (s + '$</td>');
		default:
			return '<td>-</td>';
	}
};
var jxxcarlson$meenylatex$MeenyLatex$Render$renderRow = function (row) {
	if (row.$ === 8) {
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
	if (body.$ === 8) {
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
			' ',
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
	if (!_n3.$) {
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
		if (!_n2.$) {
			var f = _n2.a;
			return A3(f, latexState, optArgs, args);
		} else {
			return A4(jxxcarlson$meenylatex$MeenyLatex$Render$reproduceMacro, name, latexState, optArgs, args);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render$render = F2(
	function (latexState, latexExpression) {
		switch (latexExpression.$) {
			case 1:
				var str = latexExpression.a;
				return jxxcarlson$meenylatex$MeenyLatex$Render$renderComment(str);
			case 6:
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render$renderMacro, latexState, name, optArgs, args);
			case 5:
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				var le = latexExpression.d;
				return A5(jxxcarlson$meenylatex$MeenyLatex$Render$renderSMacro, latexState, name, optArgs, args, le);
			case 2:
				var level = latexExpression.a;
				var latexExpr = latexExpression.b;
				return A3(jxxcarlson$meenylatex$MeenyLatex$Render$renderItem, latexState, level, latexExpr);
			case 3:
				var str = latexExpression.a;
				return '$' + (str + '$');
			case 4:
				var str = latexExpression.a;
				return '$$' + (str + '$$');
			case 7:
				var name = latexExpression.a;
				var args = latexExpression.b;
				var body = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render$renderEnvironment, latexState, name, args, body);
			case 8:
				var args = latexExpression.a;
				return A2(jxxcarlson$meenylatex$MeenyLatex$Render$renderLatexList, latexState, args);
			case 0:
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
		if (!_n0.$) {
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
		var _n0 = A2(elm$core$Dict$get, key, latexState.cB);
		if (!_n0.$) {
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
		var _n0 = A2(elm$core$Dict$get, label, latexState.cz);
		if (!_n0.$) {
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
		return {dl: align, cF: _float, cj: width};
	});
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$parser$Parser$Advanced$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
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
								return c !== ':';
							}),
						elm$parser$Parser$spaces),
					elm$parser$Parser$symbol(':')),
				elm$parser$Parser$spaces)),
		jxxcarlson$meenylatex$MeenyLatex$Parser$word(
			function (c) {
				return c !== ',';
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
		return (imageAttrs.cF === 'left') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$alt(label),
					elm$html$Html$Attributes$align('left'),
					elm$html$Html$Attributes$width(imageAttrs.cj)
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
				])) : ((imageAttrs.cF === 'right') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$alt(label),
					elm$html$Html$Attributes$align('right'),
					elm$html$Html$Attributes$width(imageAttrs.cj)
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
				])) : ((imageAttrs.dl === 'center') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$alt(label),
					elm$html$Html$Attributes$align('center'),
					elm$html$Html$Attributes$width(imageAttrs.cj)
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
					elm$html$Html$Attributes$width(imageAttrs.cj)
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
		var theImage = (imageAttrs.cF === 'left') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('left'),
					elm$html$Html$Attributes$width(imageAttrs.cj)
				]),
			_List_Nil) : ((imageAttrs.cF === 'right') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('right'),
					elm$html$Html$Attributes$width(imageAttrs.cj)
				]),
			_List_Nil) : ((imageAttrs.dl === 'center') ? A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('center'),
					elm$html$Html$Attributes$width(imageAttrs.cj)
				]),
			_List_Nil) : A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(imageUrl),
					elm$html$Html$Attributes$alt('imagref'),
					elm$html$Html$Attributes$align('center'),
					elm$html$Html$Attributes$width(imageAttrs.cj)
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
		if (_n0.$ === 1) {
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
		jxxcarlson$meenylatex$MeenyLatex$Render2$sectionPrefix(ti.aG),
		ti.ek);
	var i = tocItem.a;
	var href = 'href=\"#_' + (id + '\"');
	var classProperty = 'class=\"sectionLevel' + (elm$core$String$fromInt(ti.aG) + '\"');
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
						elm$html$Html$text(ti.ek)
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
		A2(elm$core$List$indexedMap, elm$core$Tuple$pair, latexState.db));
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
		case 0:
			var s = cell.a;
			return A2(
				elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(s)
					]));
		case 3:
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
	if (row.$ === 8) {
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
	if (body.$ === 8) {
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
	if (!_n3.$) {
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
		if (!_n2.$) {
			var f = _n2.a;
			return A3(f, latexState, optArgs, args);
		} else {
			return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$reproduceMacro, name, latexState, optArgs, args);
		}
	});
var jxxcarlson$meenylatex$MeenyLatex$Render2$render = F2(
	function (latexState, latexExpression) {
		switch (latexExpression.$) {
			case 1:
				var str = latexExpression.a;
				return A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('')
						]));
			case 6:
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacro, latexState, name, optArgs, args);
			case 5:
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				var le = latexExpression.d;
				return A5(jxxcarlson$meenylatex$MeenyLatex$Render2$renderSMacro, latexState, name, optArgs, args, le);
			case 2:
				var level = latexExpression.a;
				var latexExpr = latexExpression.b;
				return A3(jxxcarlson$meenylatex$MeenyLatex$Render2$renderItem, latexState, level, latexExpr);
			case 3:
				var str = latexExpression.a;
				return A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							jxxcarlson$meenylatex$MeenyLatex$Render2$oneSpace,
							jxxcarlson$meenylatex$MeenyLatex$Render2$inlineMathText(str)
						]));
			case 4:
				var str = latexExpression.a;
				return jxxcarlson$meenylatex$MeenyLatex$Render2$displayMathText(str);
			case 7:
				var name = latexExpression.a;
				var args = latexExpression.b;
				var body = latexExpression.c;
				return A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnvironment, latexState, name, args, body);
			case 8:
				var latexList = latexExpression.a;
				return A2(jxxcarlson$meenylatex$MeenyLatex$Render2$renderLatexList, latexState, latexList);
			case 0:
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
				['theorem', 'proposition', 'corollary', 'lemma', 'definition'])) ? A4(jxxcarlson$meenylatex$MeenyLatex$Render2$renderTheoremLikeEnvironment, latexState, name, args, body) : A4(
			jxxcarlson$meenylatex$MeenyLatex$Render2$renderDefaultEnvironment2,
			latexState,
			jxxcarlson$meenylatex$MeenyLatex$Utility$capitalize(name),
			args,
			body);
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
		if (!_n0.$) {
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
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacroDict = jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderMacroDict();
jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderMacroDict = function () {
	return jxxcarlson$meenylatex$MeenyLatex$Render2$renderMacroDict;
};
var jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnvironmentDict = jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderEnvironmentDict();
jxxcarlson$meenylatex$MeenyLatex$Render2$cyclic$renderEnvironmentDict = function () {
	return jxxcarlson$meenylatex$MeenyLatex$Render2$renderEnvironmentDict;
};
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
var jxxcarlson$meenylatex$MeenyLatex$MiniLatex$initializeEditRecord = F2(
	function (seed, text) {
		return A5(jxxcarlson$meenylatex$MeenyLatex$LatexDiffer$update, seed, jxxcarlson$meenylatex$MeenyLatex$Render2$renderLatexList, jxxcarlson$meenylatex$MeenyLatex$Render2$renderString, jxxcarlson$meenylatex$MeenyLatex$Differ$emptyEditRecordHtmlMsg, text);
	});
var mdgriffith$stylish_elephants$Internal$Model$AsParagraph = 4;
var mdgriffith$stylish_elephants$Internal$Model$asParagraph = 4;
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
var author$project$DocumentView$viewMiniLatex = F2(
	function (texMacros, document) {
		var source = (texMacros === '') ? document.az : A2(author$project$DocumentView$prependMacros, texMacros, document.az);
		var preamble = author$project$DocumentView$setCounterText(document.cg);
		var editRecord = A2(
			jxxcarlson$meenylatex$MeenyLatex$MiniLatex$initializeEditRecord,
			0,
			_Utils_ap(preamble, source));
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
				jxxcarlson$meenylatex$MeenyLatex$MiniLatex$getRenderedText(editRecord)));
	});
var author$project$DocumentView$viewPlainText = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		mdgriffith$stylish_elephants$Element$html(
			author$project$MarkdownTools$view(document.az)));
};
var author$project$DocumentView$documentContentView_ = F3(
	function (debounceCounter, texMacros, document) {
		var _n0 = document.ch;
		switch (_n0) {
			case 0:
				return A2(author$project$DocumentView$viewMiniLatex, texMacros, document);
			case 1:
				return author$project$DocumentView$viewMarkdown(document);
			case 2:
				return A2(author$project$DocumentView$viewAsciidoc, debounceCounter, document.az);
			case 3:
				return A2(author$project$DocumentView$viewAsciidoc, debounceCounter, document.az);
			default:
				return author$project$DocumentView$viewPlainText(document);
		}
	});
var author$project$Configuration$coverArtUrl = 'http://noteimages.s3.amazonaws.com/app_images/robin2.jpg';
var author$project$KVList$keyValueStringHelper = function (tag) {
	return elm$core$Maybe$Just(
		A2(
			elm$core$String$join,
			':',
			A2(
				elm$core$List$drop,
				1,
				A2(elm$core$String$split, ':', tag))));
};
var author$project$KVList$stringValueForKey = F2(
	function (key, tags) {
		var maybeMacrotag = elm$core$List$head(
			A2(
				elm$core$List$filter,
				function (tag) {
					return A2(elm$core$String$startsWith, key + ':', tag);
				},
				tags));
		var value = function () {
			if (maybeMacrotag.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var tag = maybeMacrotag.a;
				return author$project$KVList$keyValueStringHelper(tag);
			}
		}();
		return value;
	});
var mdgriffith$stylish_elephants$Element$clip = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.dL);
var mdgriffith$stylish_elephants$Element$image = F2(
	function (attrs, _n0) {
		var src = _n0.eN;
		var description = _n0.dT;
		var imageAttributes = A2(
			elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 7:
						return true;
					case 8:
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(elm$core$List$cons, mdgriffith$stylish_elephants$Element$clip, attrs),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						mdgriffith$stylish_elephants$Internal$Model$element,
						mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
						mdgriffith$stylish_elephants$Internal$Model$asEl,
						elm$core$Maybe$Just('img'),
						_Utils_ap(
							imageAttributes,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm$html$Html$Attributes$src(src)),
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm$html$Html$Attributes$alt(description))
								])),
						mdgriffith$stylish_elephants$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var author$project$DocumentView$viewCoverArt = function (document) {
	var coverArtUrl = A2(
		elm$core$Maybe$withDefault,
		author$project$Configuration$coverArtUrl,
		A2(author$project$KVList$stringValueForKey, 'coverArt', document.cg));
	return A2(
		mdgriffith$stylish_elephants$Element$image,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
			]),
		{dT: 'Cover Art', eN: coverArtUrl});
};
var author$project$DocumentView$documentContentView = F3(
	function (debounceCounter, texMacros, document) {
		var _n0 = document.bY;
		if (_n0 === 1) {
			return author$project$DocumentView$viewCoverArt(document);
		} else {
			return A3(author$project$DocumentView$documentContentView_, debounceCounter, texMacros, document);
		}
	});
var author$project$DocumentView$documentView = F3(
	function (debounceCounter, texMacros, doc) {
		return {
			az: A3(author$project$DocumentView$documentContentView, debounceCounter, texMacros, doc),
			as: doc.as
		};
	});
var author$project$DocumentView$GetPublicDocumentsRawQuery2 = function (a) {
	return {$: 3, a: a};
};
var author$project$Widget$listItemStyleBoldPale = function (width_) {
	return _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$Font$size(14),
			mdgriffith$stylish_elephants$Element$mouseDown(
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$size(13),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightYellow)
				])),
			mdgriffith$stylish_elephants$Element$Font$color(
			A3(mdgriffith$stylish_elephants$Element$rgb, 0.75, 0.75, 0.9)),
			mdgriffith$stylish_elephants$Element$Font$bold,
			mdgriffith$stylish_elephants$Element$width(width_),
			mdgriffith$stylish_elephants$Element$height(
			mdgriffith$stylish_elephants$Element$px(24)),
			mdgriffith$stylish_elephants$Element$clipX
		]);
};
var author$project$DocumentView$getAuthorsDocumentsTitleButton2 = F2(
	function (width_, document) {
		var authorname = document.bQ;
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$listItemStyleBoldPale(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('(' + (authorname + ')')),
				eo: elm$core$Maybe$Just(
					author$project$DocumentView$GetPublicDocumentsRawQuery2('authorname=' + authorname))
			});
	});
var author$project$DocumentView$getAuthorsDocumentsTitleButton_ = F2(
	function (width_, document) {
		var authorname = document.bQ;
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$listItemStyleBoldPale(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text(authorname),
				eo: elm$core$Maybe$Just(
					author$project$DocumentView$GetPublicDocumentsRawQuery2('authorname=' + authorname))
			});
	});
var author$project$DocumentView$LoadMasterWithCurrentSelection = function (a) {
	return {$: 2, a: a};
};
var author$project$Widget$mediumLightBlue = A3(mdgriffith$stylish_elephants$Element$rgb, 0.75, 0.75, 1.0);
var author$project$Widget$titleStyleLight = _List_fromArray(
	[
		mdgriffith$stylish_elephants$Element$Font$size(13),
		mdgriffith$stylish_elephants$Element$mouseDown(
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$size(13)
			])),
		mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$mediumLightBlue),
		A2(mdgriffith$stylish_elephants$Element$paddingXY, 10, 0),
		mdgriffith$stylish_elephants$Element$clipX
	]);
var mdgriffith$stylish_elephants$Internal$Flag$moveY = mdgriffith$stylish_elephants$Internal$Flag$flag(26);
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
var author$project$DocumentView$loadChildrenButton = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$titleStyleLight,
			{
				ef: A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$moveUp(0),
							mdgriffith$stylish_elephants$Element$padding(5),
							mdgriffith$stylish_elephants$Element$Font$size(18),
							mdgriffith$stylish_elephants$Element$Font$bold
						]),
					mdgriffith$stylish_elephants$Element$text(document.as)),
				eo: elm$core$Maybe$Just(
					author$project$DocumentView$LoadMasterWithCurrentSelection(document.Z))
			}));
};
var author$project$DocumentView$loadMasterDocumentButton = function (document) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_Nil,
		A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$titleStyleLight,
			{
				ef: A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$padding(10),
							mdgriffith$stylish_elephants$Element$Font$size(18),
							mdgriffith$stylish_elephants$Element$Font$bold
						]),
					mdgriffith$stylish_elephants$Element$text(document.b9)),
				eo: elm$core$Maybe$Just(
					author$project$DocumentView$LoadMasterWithCurrentSelection(document.bz))
			}));
};
var author$project$Widget$charcoal = A3(mdgriffith$stylish_elephants$Element$rgb, 0.4, 0.4, 0.4);
var author$project$DocumentView$titleLineStyle = function (height_) {
	return _List_fromArray(
		[
			A2(mdgriffith$stylish_elephants$Element$paddingXY, 10, 10),
			mdgriffith$stylish_elephants$Element$spacing(5),
			mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$charcoal),
			mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$white),
			mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
			mdgriffith$stylish_elephants$Element$height(
			mdgriffith$stylish_elephants$Element$px(height_))
		]);
};
var author$project$DocumentView$titleLine = function (document) {
	return (!document.bz) ? ((!document.bY) ? A2(
		mdgriffith$stylish_elephants$Element$column,
		author$project$DocumentView$titleLineStyle(56),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(18),
						mdgriffith$stylish_elephants$Element$Font$bold
					]),
				mdgriffith$stylish_elephants$Element$text(document.as)),
				A2(author$project$DocumentView$getAuthorsDocumentsTitleButton_, mdgriffith$stylish_elephants$Element$fill, document)
			])) : A2(
		mdgriffith$stylish_elephants$Element$column,
		author$project$DocumentView$titleLineStyle(76),
		_List_fromArray(
			[
				author$project$DocumentView$loadChildrenButton(document),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$moveRight(20)
					]),
				A2(author$project$DocumentView$getAuthorsDocumentsTitleButton_, mdgriffith$stylish_elephants$Element$fill, document))
			]))) : A2(
		mdgriffith$stylish_elephants$Element$column,
		author$project$DocumentView$titleLineStyle(84),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$row,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$spacing(10)
					]),
				_List_fromArray(
					[
						author$project$DocumentView$loadMasterDocumentButton(document),
						A2(
						mdgriffith$stylish_elephants$Element$el,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$moveRight(20)
							]),
						A2(author$project$DocumentView$getAuthorsDocumentsTitleButton2, mdgriffith$stylish_elephants$Element$fill, document))
					])),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$moveRight(20),
						mdgriffith$stylish_elephants$Element$Font$size(18),
						mdgriffith$stylish_elephants$Element$Font$bold
					]),
				mdgriffith$stylish_elephants$Element$text(document.as))
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$CenterX = 1;
var mdgriffith$stylish_elephants$Element$centerX = mdgriffith$stylish_elephants$Internal$Model$AlignX(1);
var mdgriffith$stylish_elephants$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$maximum = F2(
	function (i, l) {
		return A2(mdgriffith$stylish_elephants$Internal$Model$Max, i, l);
	});
var author$project$DocumentView$view = F5(
	function (windowHeight_, counter, debounceCounter, texMacros, document) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(15),
					mdgriffith$stylish_elephants$Element$width(
					A2(mdgriffith$stylish_elephants$Element$maximum, 600, mdgriffith$stylish_elephants$Element$fill)),
					mdgriffith$stylish_elephants$Element$centerX
				]),
			_List_fromArray(
				[
					author$project$DocumentView$titleLine(document),
					A3(
					author$project$DocumentView$contentView,
					windowHeight_,
					counter,
					A3(author$project$DocumentView$documentView, debounceCounter, texMacros, document))
				]));
	});
var author$project$Main$DocViewMsg = function (a) {
	return {$: 21, a: a};
};
var author$project$DocumentDictionary$get = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$get, key, dict);
	});
var author$project$Main$texMacros = function (model) {
	var _n0 = A2(author$project$DocumentDictionary$get, 'texmacros', model.I);
	if (_n0.$ === 1) {
		return '';
	} else {
		var doc = _n0.a;
		return doc.az;
	}
};
var author$project$Widget$lightGrey = A3(mdgriffith$stylish_elephants$Element$rgb, 0.95, 0.95, 0.95);
var author$project$Main$bodyReaderColumn = F3(
	function (windowHeight_, portion_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(
					mdgriffith$stylish_elephants$Element$fillPortion(portion_)),
					mdgriffith$stylish_elephants$Element$height(
					mdgriffith$stylish_elephants$Element$px(windowHeight_ - 73)),
					A2(mdgriffith$stylish_elephants$Element$paddingXY, 20, 20),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightGrey),
					mdgriffith$stylish_elephants$Element$centerX
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$map,
					author$project$Main$DocViewMsg,
					A5(
						author$project$DocumentView$view,
						windowHeight_,
						model.af,
						model.aT,
						author$project$Main$texMacros(model),
						model.a))
				]));
	});
var author$project$Main$AcceptEmail = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Element$moveDown = function (y) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$moveY,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Just(y),
				elm$core$Maybe$Nothing)));
};
var author$project$Main$emailInput = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$text,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(180)),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(30)),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$black)
			]),
		{
			ef: A2(
				mdgriffith$stylish_elephants$Element$Input$labelAbove,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(12),
						mdgriffith$stylish_elephants$Element$Font$bold,
						mdgriffith$stylish_elephants$Element$moveDown(0)
					]),
				mdgriffith$stylish_elephants$Element$text('Email')),
			am: elm$core$Maybe$Just(
				function (str) {
					return author$project$Main$AcceptEmail(str);
				}),
			ap: elm$core$Maybe$Nothing,
			ar: model.K
		});
};
var author$project$Main$SignIn = {$: 8};
var author$project$Main$getTokenButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Sign in'),
				eo: elm$core$Maybe$Just(author$project$Main$SignIn)
			});
	});
var author$project$Main$RegistrationMode = 0;
var author$project$Main$SetSignupMode = function (a) {
	return {$: 11, a: a};
};
var author$project$Main$gotoRegistrationButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Sign up'),
				eo: elm$core$Maybe$Just(
					author$project$Main$SetSignupMode(0))
			});
	});
var author$project$Main$AcceptPassword = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Element$Input$newPassword = F2(
	function (attrs, pass) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{
				B: elm$core$Maybe$Just('new-password'),
				F: false,
				O: mdgriffith$stylish_elephants$Element$Input$TextInputNode(
					pass.eI ? 'text' : 'password')
			},
			attrs,
			{ef: pass.ef, am: pass.am, ap: pass.ap, ar: pass.ar});
	});
var author$project$Main$passwordInput = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$newPassword,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(180)),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(30)),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$black)
			]),
		{
			ef: A2(
				mdgriffith$stylish_elephants$Element$Input$labelAbove,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(12),
						mdgriffith$stylish_elephants$Element$Font$bold,
						mdgriffith$stylish_elephants$Element$moveDown(0)
					]),
				mdgriffith$stylish_elephants$Element$text('Password')),
			am: elm$core$Maybe$Just(
				function (str) {
					return author$project$Main$AcceptPassword(str);
				}),
			ap: elm$core$Maybe$Nothing,
			eI: false,
			ar: model.ab
		});
};
var author$project$Main$loginPanel = function (model) {
	var _n0 = model.h;
	if (!_n0.$) {
		return mdgriffith$stylish_elephants$Element$none;
	} else {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$padding(20),
					mdgriffith$stylish_elephants$Element$spacing(20)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$bold,
							mdgriffith$stylish_elephants$Element$Font$size(18)
						]),
					mdgriffith$stylish_elephants$Element$text('Sign in')),
					author$project$Main$emailInput(model),
					author$project$Main$passwordInput(model),
					A2(
					mdgriffith$stylish_elephants$Element$row,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$spacing(15)
						]),
					_List_fromArray(
						[
							A2(
							author$project$Main$getTokenButton,
							mdgriffith$stylish_elephants$Element$px(66),
							model),
							A2(
							author$project$Main$gotoRegistrationButton,
							mdgriffith$stylish_elephants$Element$px(66),
							model)
						]))
				]));
	}
};
var author$project$Main$cancelRegistrationButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Cancel'),
				eo: elm$core$Maybe$Just(
					author$project$Main$SetSignupMode(1))
			});
	});
var author$project$Main$RegisterUser = {$: 10};
var author$project$Main$registerUserButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Sign up'),
				eo: elm$core$Maybe$Just(author$project$Main$RegisterUser)
			});
	});
var author$project$Main$AcceptUserName = function (a) {
	return {$: 3, a: a};
};
var author$project$Main$usernameInput = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$text,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(180)),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(30)),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$black)
			]),
		{
			ef: A2(
				mdgriffith$stylish_elephants$Element$Input$labelAbove,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(12),
						mdgriffith$stylish_elephants$Element$Font$bold,
						mdgriffith$stylish_elephants$Element$moveDown(0)
					]),
				mdgriffith$stylish_elephants$Element$text('User name')),
			am: elm$core$Maybe$Just(
				function (str) {
					return author$project$Main$AcceptUserName(str);
				}),
			ap: elm$core$Maybe$Nothing,
			ar: model.aw
		});
};
var author$project$Main$signupPanel = function (model) {
	var _n0 = model.h;
	if (!_n0.$) {
		return mdgriffith$stylish_elephants$Element$none;
	} else {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$padding(20),
					mdgriffith$stylish_elephants$Element$spacing(20)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$bold,
							mdgriffith$stylish_elephants$Element$Font$size(18)
						]),
					mdgriffith$stylish_elephants$Element$text('Sign up')),
					author$project$Main$emailInput(model),
					author$project$Main$usernameInput(model),
					author$project$Main$passwordInput(model),
					A2(
					mdgriffith$stylish_elephants$Element$row,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$spacing(15)
						]),
					_List_fromArray(
						[
							A2(
							author$project$Main$registerUserButton,
							mdgriffith$stylish_elephants$Element$px(65),
							model),
							A2(
							author$project$Main$cancelRegistrationButton,
							mdgriffith$stylish_elephants$Element$px(60),
							model)
						]))
				]));
	}
};
var author$project$Main$loginOrSignUpPanel = function (model) {
	var _n0 = model.bE;
	if (_n0 === 1) {
		return author$project$Main$loginPanel(model);
	} else {
		return author$project$Main$signupPanel(model);
	}
};
var author$project$Main$currentUserNameElement = function (model) {
	var _n0 = model.h;
	if (_n0.$ === 1) {
		return mdgriffith$stylish_elephants$Element$none;
	} else {
		var user = _n0.a;
		return A2(
			mdgriffith$stylish_elephants$Element$el,
			_List_Nil,
			mdgriffith$stylish_elephants$Element$text(
				'Signed in as ' + author$project$User$username(user)));
	}
};
var author$project$Main$SignOut = {$: 9};
var author$project$Main$signoutButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Sign out'),
				eo: elm$core$Maybe$Just(author$project$Main$SignOut)
			});
	});
var author$project$Main$GetUserManual = {$: 42};
var author$project$Widget$listItemStyleBold = function (width_) {
	return _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$Font$size(14),
			mdgriffith$stylish_elephants$Element$mouseDown(
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$size(13),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightYellow)
				])),
			mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$blue),
			mdgriffith$stylish_elephants$Element$Font$bold,
			mdgriffith$stylish_elephants$Element$width(width_),
			mdgriffith$stylish_elephants$Element$height(
			mdgriffith$stylish_elephants$Element$px(24)),
			mdgriffith$stylish_elephants$Element$clipX
		]);
};
var author$project$Main$viewUserManualButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$listItemStyleBold(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('User manual'),
				eo: elm$core$Maybe$Just(author$project$Main$GetUserManual)
			});
	});
var author$project$Main$logoutPanel = function (model) {
	var _n0 = model.h;
	if (_n0.$ === 1) {
		return mdgriffith$stylish_elephants$Element$none;
	} else {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$padding(20),
					mdgriffith$stylish_elephants$Element$spacing(20)
				]),
			_List_fromArray(
				[
					author$project$Main$currentUserNameElement(model),
					A2(
					author$project$Main$signoutButton,
					mdgriffith$stylish_elephants$Element$px(70),
					model),
					A2(
					author$project$Main$viewUserManualButton,
					mdgriffith$stylish_elephants$Element$px(90),
					model)
				]));
	}
};
var author$project$Main$bodyRightColumn = F2(
	function (portion_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(
					mdgriffith$stylish_elephants$Element$fillPortion(portion_)),
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightBlue),
					mdgriffith$stylish_elephants$Element$centerX
				]),
			_List_fromArray(
				[
					author$project$Main$loginOrSignUpPanel(model),
					author$project$Main$logoutPanel(model)
				]));
	});
var author$project$Main$readerBody = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$row,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$fillPortion(4)),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$white),
				mdgriffith$stylish_elephants$Element$centerX
			]),
		_List_fromArray(
			[
				A2(author$project$Main$bodyLeftColumn, 2, model),
				A3(author$project$Main$bodyReaderColumn, model.P, 7, model),
				A2(author$project$Main$bodyRightColumn, 2, model)
			]));
};
var author$project$Main$GetContent = function (a) {
	return {$: 27, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$OnLeft = 3;
var mdgriffith$stylish_elephants$Element$Input$labelLeft = mdgriffith$stylish_elephants$Element$Input$Label(3);
var author$project$Main$textArea = F4(
	function (model, width_, windowHeight_, label_) {
		return A2(
			mdgriffith$stylish_elephants$Element$Keyed$row,
			_List_Nil,
			_List_fromArray(
				[
					_Utils_Tuple2(
					elm$core$String$fromInt(model.af),
					A2(
						mdgriffith$stylish_elephants$Element$Input$multiline,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$width(width_),
								mdgriffith$stylish_elephants$Element$height(
								mdgriffith$stylish_elephants$Element$px(windowHeight_ - 80)),
								A2(mdgriffith$stylish_elephants$Element$paddingXY, 10, 0),
								mdgriffith$stylish_elephants$Element$scrollbarY
							]),
						{
							ef: A2(
								mdgriffith$stylish_elephants$Element$Input$labelLeft,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$size(14),
										mdgriffith$stylish_elephants$Element$Font$bold
									]),
								mdgriffith$stylish_elephants$Element$text('')),
							am: elm$core$Maybe$Just(author$project$Main$GetContent),
							ap: elm$core$Maybe$Nothing,
							c9: false,
							ar: model.a.az
						}))
				]));
	});
var author$project$Main$bodyEditorColumn = F3(
	function (windowHeight_, portion_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(
					mdgriffith$stylish_elephants$Element$fillPortion(portion_)),
					mdgriffith$stylish_elephants$Element$height(
					mdgriffith$stylish_elephants$Element$px(windowHeight_ - 80)),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$lightYellow),
					mdgriffith$stylish_elephants$Element$centerX
				]),
			_List_fromArray(
				[
					A4(
					author$project$Main$textArea,
					model,
					mdgriffith$stylish_elephants$Element$fillPortion(portion_),
					windowHeight_,
					'Editor')
				]));
	});
var author$project$Main$writerBody = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$row,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(model.P - 70)),
				mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$white),
				mdgriffith$stylish_elephants$Element$centerX
			]),
		_List_fromArray(
			[
				A2(author$project$Main$bodyLeftColumn, 2, model),
				A3(author$project$Main$bodyEditorColumn, model.P, 5, model),
				A3(author$project$Main$bodyReaderColumn, model.P, 5, model)
			]));
};
var author$project$Main$body = function (model) {
	var _n0 = model.t;
	if (!_n0) {
		return author$project$Main$readerBody(model);
	} else {
		return author$project$Main$writerBody(model);
	}
};
var author$project$Document$wordCount = function (document) {
	return elm$core$List$length(
		elm$core$String$words(document.az));
};
var author$project$Main$access = function (doc) {
	var _n0 = doc.cb;
	if (_n0) {
		return 'Public document';
	} else {
		return 'Private document';
	}
};
var author$project$Widget$indicatorBad = A3(mdgriffith$stylish_elephants$Element$rgb, 1.0, 0.9, 0.0);
var author$project$Widget$indicatorGood = A3(mdgriffith$stylish_elephants$Element$rgb, 0.0, 0.9, 0.0);
var author$project$Main$documentDirtyIndicator = function (model) {
	var _n0 = model.z;
	if (!_n0) {
		return mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$indicatorGood);
	} else {
		return mdgriffith$stylish_elephants$Element$Background$color(author$project$Widget$indicatorBad);
	}
};
var author$project$Main$GetPublicDocumentsRawQuery = function (a) {
	return {$: 14, a: a};
};
var author$project$Main$getAuthorsDocumentsButton_ = F2(
	function (width_, model) {
		var authorname = model.a.bQ;
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Author docs'),
				eo: elm$core$Maybe$Just(
					author$project$Main$GetPublicDocumentsRawQuery('authorname=' + authorname))
			});
	});
var author$project$Main$getAuthorsDocumentsButton = F2(
	function (width_, model) {
		return (model.a.Z > 0) ? A2(author$project$Main$getAuthorsDocumentsButton_, width_, model) : mdgriffith$stylish_elephants$Element$none;
	});
var author$project$Main$printTypeString = function (document) {
	var _n0 = document.ch;
	switch (_n0) {
		case 2:
			return 'text=adoc';
		case 3:
			return 'text=adoc_latex';
		case 0:
			return 'text=latex';
		case 4:
			return 'text=latex';
		default:
			return 'text=markdown';
	}
};
var author$project$Main$printReference = function (document) {
	return author$project$Configuration$backend + ('/print/documents' + ('/' + (elm$core$String$fromInt(document.Z) + ('?' + author$project$Main$printTypeString(document)))));
};
var author$project$Widget$linkButtonFat = F3(
	function (url, label_, width_) {
		return A2(
			mdgriffith$stylish_elephants$Element$newTabLink,
			author$project$Widget$buttonStyle(width_),
			{
				ef: A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$moveDown(0)
						]),
					mdgriffith$stylish_elephants$Element$text(label_)),
				bf: url
			});
	});
var author$project$Main$printButton = function (document) {
	return A3(
		author$project$Widget$linkButtonFat,
		author$project$Main$printReference(document),
		'Print',
		mdgriffith$stylish_elephants$Element$px(50));
};
var author$project$Main$printDocument_ = function (model) {
	return author$project$Main$printButton(model.a);
};
var author$project$Main$printDocument = function (model) {
	var _n0 = model.a.Z > 0;
	if (_n0) {
		return author$project$Main$printDocument_(model);
	} else {
		return mdgriffith$stylish_elephants$Element$none;
	}
};
var author$project$Main$saveCurrentDocumentButton = F2(
	function (width_, model) {
		var _n0 = model.h;
		if (_n0.$ === 1) {
			return mdgriffith$stylish_elephants$Element$none;
		} else {
			return A2(
				mdgriffith$stylish_elephants$Element$Input$button,
				author$project$Widget$buttonStyle(width_),
				{
					ef: mdgriffith$stylish_elephants$Element$text('Save'),
					eo: elm$core$Maybe$Just(
						author$project$Main$SaveCurrentDocument(
							elm$time$Time$millisToPosix(10)))
				});
		}
	});
var author$project$Widget$grey = A3(mdgriffith$stylish_elephants$Element$rgb, 0.8, 0.8, 0.8);
var author$project$Main$footer = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$row,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$moveUp(8),
				mdgriffith$stylish_elephants$Element$spacing(15),
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
				mdgriffith$stylish_elephants$Element$text(model.e)),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						author$project$Main$documentDirtyIndicator(model),
						mdgriffith$stylish_elephants$Element$padding(5)
					]),
				mdgriffith$stylish_elephants$Element$text(
					'id ' + elm$core$String$fromInt(model.a.Z))),
				A2(
				author$project$Main$saveCurrentDocumentButton,
				mdgriffith$stylish_elephants$Element$px(50),
				model),
				author$project$Main$printDocument(model),
				A2(
				author$project$Main$getAuthorsDocumentsButton,
				mdgriffith$stylish_elephants$Element$px(90),
				model),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_Nil,
				mdgriffith$stylish_elephants$Element$text('Author: ' + model.a.bQ)),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_Nil,
				mdgriffith$stylish_elephants$Element$text(
					author$project$Main$access(model.a))),
				A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_Nil,
				mdgriffith$stylish_elephants$Element$text(
					elm$core$String$fromInt(
						author$project$Document$wordCount(model.a)) + ' words'))
			]));
};
var author$project$Main$appTitle = function (appMode) {
	if (!appMode) {
		return 'kNode Reader';
	} else {
		return 'kNode Writer';
	}
};
var author$project$Main$getRandomDocumentsButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Random'),
				eo: elm$core$Maybe$Just(
					author$project$Main$GetPublicDocumentsRawQuery('random=public'))
			});
	});
var author$project$Main$GoHome = {$: 24};
var author$project$Main$homeButton = F2(
	function (width_, model) {
		var _n0 = model.h;
		if (_n0.$ === 1) {
			return mdgriffith$stylish_elephants$Element$none;
		} else {
			return A2(
				mdgriffith$stylish_elephants$Element$Input$button,
				author$project$Widget$buttonStyle(width_),
				{
					ef: mdgriffith$stylish_elephants$Element$text('Home'),
					eo: elm$core$Maybe$Just(author$project$Main$GoHome)
				});
		}
	});
var author$project$Main$ChangeMode = function (a) {
	return {$: 25, a: a};
};
var author$project$Main$modeButtonStyle = F3(
	function (appMode, buttonMode, width_) {
		var _n0 = _Utils_eq(appMode, buttonMode);
		if (_n0) {
			return A2(author$project$Widget$buttonStyleWithColor, author$project$Widget$darkRed, width_);
		} else {
			return A2(author$project$Widget$buttonStyleWithColor, author$project$Widget$blue, width_);
		}
	});
var author$project$Main$readerModeButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			A3(author$project$Main$modeButtonStyle, model.t, 0, width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Read'),
				eo: elm$core$Maybe$Just(
					author$project$Main$ChangeMode(0))
			});
	});
var author$project$Main$AcceptSearchQuery = function (a) {
	return {$: 4, a: a};
};
var mdgriffith$stylish_elephants$Element$Input$Placeholder = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$Input$placeholder = mdgriffith$stylish_elephants$Element$Input$Placeholder;
var author$project$Main$searchInput = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$Input$text,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				elm$html$Html$Attributes$id('search-box')),
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(400)),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(30)),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Widget$black)
			]),
		{
			ef: A2(
				mdgriffith$stylish_elephants$Element$Input$labelLeft,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(14),
						mdgriffith$stylish_elephants$Element$Font$bold
					]),
				mdgriffith$stylish_elephants$Element$text('')),
			am: elm$core$Maybe$Just(
				function (str) {
					return author$project$Main$AcceptSearchQuery(str);
				}),
			ap: elm$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Element$Input$placeholder,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$moveUp(5)
						]),
					mdgriffith$stylish_elephants$Element$text('Search example: type \'quantum\', then press Enter'))),
			ar: model.aK
		});
};
var author$project$Main$GoToStart = {$: 23};
var author$project$Main$startButton = F2(
	function (width_, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Widget$buttonStyle(width_),
			{
				ef: mdgriffith$stylish_elephants$Element$text('Start'),
				eo: elm$core$Maybe$Just(author$project$Main$GoToStart)
			});
	});
var author$project$Main$Writing = 1;
var author$project$Main$writerModeButton = F2(
	function (width_, model) {
		var _n0 = model.h;
		if (_n0.$ === 1) {
			return mdgriffith$stylish_elephants$Element$none;
		} else {
			return A2(
				mdgriffith$stylish_elephants$Element$Input$button,
				A3(author$project$Main$modeButtonStyle, model.t, 1, width_),
				{
					ef: mdgriffith$stylish_elephants$Element$text('Write'),
					eo: elm$core$Maybe$Just(
						author$project$Main$ChangeMode(1))
				});
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Left = 0;
var mdgriffith$stylish_elephants$Element$alignLeft = mdgriffith$stylish_elephants$Internal$Model$AlignX(0);
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
				mdgriffith$stylish_elephants$Element$spacing(10),
				mdgriffith$stylish_elephants$Element$alignLeft
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$row,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$spacing(20)
					]),
				_List_fromArray(
					[
						author$project$Main$searchInput(model),
						A2(
						author$project$Main$getRandomDocumentsButton,
						mdgriffith$stylish_elephants$Element$px(70),
						model),
						A2(
						mdgriffith$stylish_elephants$Element$el,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Font$size(24)
							]),
						mdgriffith$stylish_elephants$Element$text(
							author$project$Main$appTitle(model.t))),
						A2(
						author$project$Main$startButton,
						mdgriffith$stylish_elephants$Element$px(55),
						model),
						A2(
						author$project$Main$homeButton,
						mdgriffith$stylish_elephants$Element$px(55),
						model),
						A2(
						author$project$Main$readerModeButton,
						mdgriffith$stylish_elephants$Element$px(52),
						model),
						A2(
						author$project$Main$writerModeButton,
						mdgriffith$stylish_elephants$Element$px(52),
						model)
					]))
			]));
};
var mdgriffith$stylish_elephants$Element$clipY = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.dN);
var mdgriffith$stylish_elephants$Internal$Model$OnlyDynamic = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$StaticRootAndDynamic = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _n4 = record.d4;
					if (_n4.$ === 1) {
						return _Utils_update(
							record,
							{
								d4: elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _n5 = record.d_;
					if (_n5.$ === 1) {
						return _Utils_update(
							record,
							{
								d_: elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _n6 = record.ej;
					if (_n6.$ === 1) {
						return _Utils_update(
							record,
							{
								ej: elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			d_: function () {
				var _n0 = record.d_;
				if (_n0.$ === 1) {
					return mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _n0.a;
					return focusable;
				}
			}(),
			d4: function () {
				var _n1 = record.d4;
				if (_n1.$ === 1) {
					return 1;
				} else {
					var hoverable = _n1.a;
					return hoverable;
				}
			}(),
			ej: function () {
				var _n2 = record.ej;
				if (_n2.$ === 1) {
					return 1;
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
			{d_: elm$core$Maybe$Nothing, d4: elm$core$Maybe$Nothing, ej: elm$core$Maybe$Nothing},
			options));
};
var mdgriffith$stylish_elephants$Internal$Model$toHtml = F2(
	function (options, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 1:
				var styles = el.a.eS;
				var html = el.a.d5;
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
									mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.d_)
								])),
						styles).b);
				return A2(
					html,
					elm$core$Maybe$Just(styleSheet),
					mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 2:
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
			var _n0 = options.ej;
			if (_n0 === 2) {
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
var mdgriffith$stylish_elephants$Internal$Model$SansSerif = {$: 1};
var mdgriffith$stylish_elephants$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
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
		var options = _n0.a3;
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
							[mdgriffith$stylish_elephants$Internal$Style$classes.eB, mdgriffith$stylish_elephants$Internal$Style$classes.du, mdgriffith$stylish_elephants$Internal$Style$classes.eJ, mdgriffith$stylish_elephants$Internal$Style$classes.aS, mdgriffith$stylish_elephants$Internal$Style$classes.aA]))),
				_Utils_ap(mdgriffith$stylish_elephants$Internal$Model$rootStyle, attrs)),
			child);
	});
var mdgriffith$stylish_elephants$Element$layout = mdgriffith$stylish_elephants$Element$layoutWith(
	{a3: _List_Nil});
var author$project$Main$view = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$layout,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$size(14),
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$clipY
			]),
		A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$height(
					mdgriffith$stylish_elephants$Element$px(model.P))
				]),
			_List_fromArray(
				[
					author$project$Main$header(model),
					author$project$Main$body(model),
					author$project$Main$footer(model)
				])));
};
var elm$browser$Browser$element = _Browser_element;
var author$project$Main$main = elm$browser$Browser$element(
	{ea: author$project$Main$init, eU: author$project$Main$subscriptions, fc: author$project$Main$update, fd: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (location) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (height) {
							return elm$json$Json$Decode$succeed(
								{b$: height, bt: location, cj: width});
						},
						A2(elm$json$Json$Decode$field, 'height', elm$json$Json$Decode$int));
				},
				A2(elm$json$Json$Decode$field, 'location', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'width', elm$json$Json$Decode$int)))(0)}});}(this));