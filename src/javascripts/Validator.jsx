import $ from 'jquery';
//Classe para validação, para um exemplo de uso checar a classe Owner.js.
class Validator {

	static validate(value,validationType,compareValue) {
		return validationType(value,compareValue);
	}

	static checkIfIsEmpty(val) {
		if(val == undefined) {
			return false;
		} else {
			return ((val.length == 0 || val == " ") ? false : true);
		}
	}

	static checkIfIsDifferentFrom(val,compareValue) {
		if(val == compareValue || val == undefined) {
			return false;
		} else {
			return ((val.length == 0 || val == " ") ? false : true);
		}
	}

	static checkEmail(val) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(val);
	}

	static checkDate(val) {
		var d = val.split('/');
		var r = Moment([d[2], d[1]-1, d[0]]).isValid();
		if( parseInt(d[2]) < 1900) r = false;
		return r;
	}

	static checkCPF(val) {
		var strCPF = val.split('.').join("").split("-").join("");
		var sum;
		var r;
		var i;
		sum = 0;
		if (strCPF == "00000000000")
			return false;
		for (i=1; i<=9; i++)
			sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
		r = (sum * 10) % 11;
		if ((r == 10) || (r == 11))
			r = 0;
		if (r != parseInt(strCPF.substring(9, 10)) )
			return false;
		sum = 0;
		for (i = 1; i <= 10; i++)
			sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
			r = (sum * 10) % 11;
		if ((r == 10) || (r == 11))
			r = 0;
		if (r != parseInt(strCPF.substring(10, 11) ) )
			return false;
		return true;
	}

	static restrictNumber(_input) {
		$(_input).on('keydown',function(e){
			// 188
			// 190
			// 194
			// 110
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
				// Allow: Ctrl+A
				(e.keyCode == 65 && e.ctrlKey === true || e.keyCode == 95 && e.ctrlKey === true) ||
				// Allow: Ctrl+C
				(e.keyCode == 67 && e.ctrlKey === true) ||
				// Allow: Ctrl+X
				(e.keyCode == 88 && e.ctrlKey === true) ||
				// Allow: home, end, left, right
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				// let it happen, don't do anything
				return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
			});
	}

	static restrictNumberDot(_input) {
		$(_input).on('keydown',function(e){
			// 188
			// 190
			// 194
			// 110
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
				// Allow: Ctrl+A
				(e.keyCode == 65 && e.ctrlKey === true || e.keyCode == 95 && e.ctrlKey === true) ||
				// Allow: Ctrl+C
				(e.keyCode == 67 && e.ctrlKey === true) ||
				// Allow: Ctrl+X
				(e.keyCode == 88 && e.ctrlKey === true) ||
				// Allow: home, end, left, right
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				// let it happen, don't do anything
				return;
			}
			// If comma or dot, check if it doesn't already have 1 comma
			if(e.keyCode == 188 || e.keyCode == 190){ 
				if ($(this).val().indexOf(",") !== -1) {
					// Found comma, prevent input
					e.preventDefault();
				} else {
					// If dot, replace with comma
					if(e.keyCode == 190){
						e.preventDefault();
					    $(this).val($(this).val() + ',');
					}
				}
				return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
	}

	static restrictRg(_input) {
		$(_input).on('keydown',function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 188, 88]) !== -1 ||
				(e.keyCode == 65 && e.ctrlKey === true || e.keyCode == 95 && e.ctrlKey === true) ||
				(e.keyCode == 67 && e.ctrlKey === true) ||
				(e.keyCode == 88 && e.ctrlKey === true) ||
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				return;
			}
			if(e.keyCode != 88) {
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			}
		});
	}

	static defaultError(validationType) {
		var defaultMsgArray = {
			checkIfIsEmpty: "Este campo é obrigatório. Por favor preencher.",
			checkIfIsDifferentFrom: "",
			checkEmail: "E-mail com formato inválido.",
			checkDate: "Data com formato inválido.",
			checkCPF: "CPF inválido. Por favor, verifique o número e tente novamente.",
			restrictNumber: "Número com formato inválido.",
			restrictNumberDot: "Número com formato inválido.",
			restrictRg: "RG inválido. Por favor, verifique o número e tente novamente."
		}
		if(defaultMsgArray.hasOwnProperty(validationType.name)) {
			return defaultMsgArray[validationType.name];
		} else {
			return "Este campo foi preenchido incorretamente. Por favor preencher novamente usando dados válidos.";
		}
	}

	static validateArray(_data, _validationArray, _errorObjectsArray) {
		var isValid = true;
		// Empty error objects array before validation
		for (var i = 0; i < _errorObjectsArray.length; ++i) {
			_errorObjectsArray[i] = "";
		}
		// Loop validation array
		for (var i = 0; i < _validationArray.length; ++i) {
			var validationItem = _validationArray[i];
			var aux = String(validationItem[0])+"Error";
			var message = "";
			// Validate
			if(!Validator.validate(_data[validationItem[0]], validationItem[1])) {
				// Check if it has a custom message
				if (validationItem[2]) {
					message = validationItem[2];
				} else {
					// Get default message
					message = Validator.defaultError(validationItem[1]);
				}
				isValid = false;
			}
			// Put message on error objects array
			if(_errorObjectsArray.hasOwnProperty(aux)) {
				// Check if error objects array hasn't previous error
				if (!_errorObjectsArray[aux]) {
					_errorObjectsArray[aux] = message;	
				}
			}
		}
		return isValid;
	}
}

export default Validator
