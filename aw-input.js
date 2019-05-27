import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwInputCharCounterMixin } 		from "../aw_form_mixins/aw-char-counter-mixin.js";
import { AwInputPrefixMixin } 			from "../aw_form_mixins/aw-input-preffix-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_form_helpers/aw-input-error.js";
import "../aw_form_helpers/aw-char-counter.js";
import "../aw_form_helpers/aw-input-datalist.js";

class AwInput extends AwInputErrorMixin( AwInputCharCounterMixin( AwInputPrefixMixin( AwExternsFunctionsMixin( AwFormValidateMixin( PolymerElement ))))) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					width: 100%;
					padding: 0 0 10px 0;
					margin: 0;
                	font-family: var(--aw-input-font-family, "arial");
					vertical-align: var(--aw-input-vertical-align, middle);
					display: inline-block;
				}

				/* #region Generales */

				.hidden, [hidden], [unresolved] {
					display: none;
				}

				#label {
					position: relative;
					color: var(--aw-input-color,#333333);
                	font-family: var(--aw-input-label-font-family,var(--aw-input-font-family, "arial"));
                	font-size: var(--aw-input-label-font-size,var(--aw-input-font-size, 16px));
					font-weight: var(--aw-input-label-font-weight,var(--aw-input-font-weight,normal));
					font-style: var(--aw-input-label-font-style,var(--aw-input-font-style,normal));
					bottom: calc(-8px - var(--aw-input-font-size, 16px));
					transition: bottom .3s, font-size .3s, color .3s;
				}
				#label[writted] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-writted,var(--aw-input-label-color,#888888));
				}
				#label[focused] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD));
				}
				#label[error] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
				}
				#label[disabled] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-disabled,var(--aw-input-color-disabled,#BBBBBB));
				}

				/* #region Container e input */

				.container {
					position: relative;
				}
				.container input {
					width: 100%;
					margin: 0;
					color: var(--aw-input-color,#333333);
					background-color: var(--aw-input-background-color,transparent);
					border: none;
					border-bottom: solid 1px #CCCCCC;
					padding: var(--aw-input-padding,7px 0 3px);
                	font-family: var(--aw-input-font-family, "arial");
                	font-size: var(--aw-input-font-size, 16px);
					font-weight: var(--aw-input-font-weight,normal);
					font-style: var(--aw-input-font-style,normal);
					text-align: var(--aw-input-text-align, left);
					box-shadow: var(--aw-input-box-shadow,none);
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
					transition: all .2s;
				}
				.container input:focus{
                	outline: 0;
					background-color: var(--aw-input-background-color-focused,var(--aw-input-background-color,transparent));
				}
				.container input[error]{
					background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
				}
				.container input[disabled]{
					color: var(--aw-input-color-disabled, #BBBBBB);
					background-color: var(--aw-input-background-color-disabled,#F9F9F9);
				}
				.container input:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px white inset !important;
					-webkit-text-fill-color: var(--aw-input-color, #111111);
				}
				.container input::-webkit-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-moz-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-ms-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-o-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-ms-reveal, input::-ms-clear {
					display: none !important;
				}
				.container input[nospinners]::-webkit-outer-spin-button,
				.container input[nospinners]::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				.container input[nospinners] {
					-moz-appearance:textfield;
				}

				/* #region Baseline */

				#baseline {
					position: absolute;
					left: 50%;
					bottom: var(--aw-input-baseline-bottom,-1px);
					width: 0;
					height: var(--aw-input-baseline-height,2px);
					background-color: var(--aw-input-baseline-color,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
					transition: left .3s, width .3s;
				}
				#baseline[focused] {
					width: 100%;
					left: 0;
				}
				#baseline[error] {
					width: 100%;
					left: 0;
					background-color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
				}

				/* #region Prefix y suffix */

				.prefix {
					position: absolute;
					top: 0px;
					left: 0px;
					padding-top: var(--aw-input-prefix-padding-top,0);
					color: var(--aw-input-prefix-color,#777777);
					font-family: var(--aw-input-prefix-font-famlily,var(--aw-input-font-family, "arial"));
					font-size: var(--aw-input-prefix-font-size,var(--aw-input-font-size, 16px));
					font-weight: var(--aw-input-prefix-font-weight, bold);
					transition: all .2s;
					opacity: 0;
				}
				.suffix {
					position: absolute;
					top: 0px;
					right: 0px;
					padding-top: var(--aw-input-prefix-padding-top,0);
					color: var(--aw-input-prefix-color,#777777);
					font-family: var(--aw-input-prefix-font-famlily,var(--aw-input-font-family, "arial"));
					font-size: var(--aw-input-prefix-font-size,var(--aw-input-font-size, 16px));
					font-weight: var(--aw-input-prefix-font-weight, bold);
					transition: all .2s;
					opacity: 0;
				}
				.container[focused] .prefix,.container[focused] .suffix {
					color: var(--aw-input-prefix-color-focused,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
				}
				.container[error] .prefix,.container[error] .suffix {
					color: var(--aw-input-prefix-color-error,var(--aw-input-label-color-error,var(--aw-error-color,#b13033)));
				}
				.prefix[show],.suffix[show] {
					opacity: 1;
				}
				.prefix > img {
					padding: 0px 3px 0px 0px;
					height: var(--aw-input-prefix-image-height,var(--aw-input-font-size, 16px));
					margin-bottom: 3px;
				}
				.suffix > img {
					padding: 0px 0px 0px 3px;
					height: var(--aw-input-prefix-image-height,var(--aw-input-font-size, 16px));
					margin-bottom: 3px;
				}
				.prefix > iron-icon, .suffix > iron-icon {
					top: var(--aw-input-prefix-icon-top,0);
					fill: var(--aw-input-prefix-color,#555555);
					width: var(--aw-input-prefix-size,22px);
					height: var(--aw-input-prefix-size,22px);
					padding: 0px;
					transition: fill .2s;
				}
				.container[focused] .prefix > iron-icon,.container[focused] .suffix > iron-icon {
					fill: var(--aw-input-prefix-color-focused,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
				}
				.container[error] .prefix > iron-icon,.container[error] .suffix > iron-icon {
					fill: var(--aw-input-prefix-color-error,var(--aw-input-label-color-error,var(--aw-error-color,#b13033)));
				}
				:host([disabled]) .prefix, :host([disabled]) .suffix {
					color: var(--aw-input-prefix-color-disabled,var(--aw-input-color-disabled, #BBBBBB));
				}
				:host([disabled]) .prefix > iron-icon, :host([disabled]) .suffix > iron-icon {
					fill: var(--aw-input-prefix-color-disabled,var(--aw-input-color-disabled, #BBBBBB));
				}

				/* #region Flexible de error y contador */

				.flex_inf {
					position: relative;
					padding: 2px 0 0;
					display: flex;
					flex: row wrap;
				}

				.flex_inf > .left {
					position: relative;
					flex-grow: 1;
					flex-basis: auto;
				}

				.flex_inf > .right {
					position: relative;
					flex-grow: 0;
					flex-basis: auto;
				}
			</style>
			<div id="label" hidden="{{!label}}">{{label}}</div>
			<div id="container" class="container">
				<label><input
					id$="[[id]]"
					name$="[[name]]"
					type$="[[type]]"
					placeholder="[[placeholder]]"
					minlength$="[[minlength]]"
					maxlength$="[[maxlength]]"
					min$="[[min]]"
					max$="[[max]]"
					step$="[[step]]"
					value$="{{value}}"
					readonly$="[[readonly]]"
					disabled$="[[disabled]]"
					autocapitalize$="[[autocapitalize]]"
					autocorrect$="[[autocorrect]]"
					autocomplete$="[[autocomplete]]"

					required$="[[required]]"
					nospaces$="[[nospaces]]"
					rangelength$="[[rangelength]]"
					isumber$="[[isumber]]"
					range$="[[range]]"
					isemail$="[[isemail]]"
					isurl$="[[isurl]]"
					domains$="[[domains]]"
					isdate$="[[isdate]]"
					dateprevius$="[[dateprevius]]"
					minage$="[[minage]]"
					maxage$="[[maxage]]"
					security$="[[security]]"
					equalto$="[[equalto]]"
					phonenumber$="[[phonenumber]]"
					phonecountry$="[[phonecountry]]"
					pattern$="[[pattern]]"
					novalidate$=[[novalidate]]

					error$=[[error]]
					errmsg$="{{errmsg}}"

					on-focusin="_focusin"
					on-focusout="_focusout"
					on-keyup="_keyup"
					on-keypress="_keypress"
					on-change="_change"
					/></label>

				<div id="baseline"></div>

				<template id="datalist" is="dom-if" if="{{datalist}}">
					<aw-input-datalist input="{{inputElement}}" datalist="{{datalist}}" dlvisible="{{dlvisible}}"></aw-input-datalist>
				</template>
			</div>
			<div class="flex_inf">
				<div class="left">
					<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>
				</div>
				<div class="right">
					<aw-char-counter unresolved hidden="{{!countchar}}">{{countCharStr}}</aw-char-counter>
				</div>
			</div>
			<slot name="datalist"></slot>
		`;
	}

	static get properties() {
		return {
			// Atributos del componente

			inputElement: { type: Object },

			// Atributos básicos del input

			id: { type: String },
			name: { type: String },
			type: { type: String },
			placeholder: { type: String },
			minlength: { type: Number },
			maxlength: { type: Number },
			min: { type: Number },
			max: { type: Number },
			step: { type: String },
			value: { type: String },
			readonly: {type: Boolean, value: false, observer: "_set_readonly"},
            disabled: {type: Boolean, value: false, observer: "_set_disabled"},
			autocapitalize: { type: String },
			autocorrect: { type: String },
			autocomplete: { type: String, value: "off" },

			// Atributos de diseño

			label: { type: String },
			noarrows: { type: Boolean, value: false },
			autofocus: { type: Boolean, value: false },
			selectonfocus: { type: Boolean, value: false },
			spinners: { type: Boolean, value: false },

			// Atrtibutos de validación

			required: { type: Boolean, value: false },
			nospaces: { type: String },
			rangelength: { type: String },
			isumber: { type: Boolean, value: false },
			range: { type: String },
			isemail: { type: Boolean, value: false },
			isurl: { type: Boolean, value: false },
			domains: { type: String },
			isdate: { type: String },
			dateprevius: { type: Boolean, value: false },
			minage: { type: String },
			maxage: { type: String },
			security: { type: String },
			equalto: { type: String },
			phonenumber: { type: Boolean, value: false },
			phonecountry: { type: String },
			pattern: { type: String },
			novalidate: { type: Boolean, value: false },
			validateonchange: { type: Boolean, value: false },

			// Datalist

			list: { type: String },
			datalist: { type: Object, notify: true },
			dlvisible: { type: Boolean, value: false, notify: true },
			observDl: { type: Object },

			// Relación con el aw-form y el form

			parentForm: { type: Object },
			noregister: { type: Boolean, value: false }
		};
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Realiza las operaciones al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Asignamos el input

		this.inputElement = this.shadowRoot.querySelector( "input" );

		// Inicializamos el componente

		this._init();

		// Activamos los errores

		this.error_listen();

		// Activamos el countchar

		this.set_countchar();

		// Ponemos el datalist

		this._set_datalist();
		
		// Buscamos prefixs y suffixs

		this.findPrefixAndSuffixs();

		// Registramos en el formulario.

		this._register_in_form();

		// Invocamos la función externa connected

		if ( typeof this.connectedfunc === "function" ) {
			this.connectedfunc( this );
		}

		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Realiza las operaciones necesarias al desconectar el componente.
	 */
	disconnectedCallback(){
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.inputElement );
		}

		// Dejamos de observar los cambios en el datalist

		if ( this.dataList ) {
			this.observDl.disconnect();
		}
	}

	/**
	 * @method	_init
	 * 
	 * Inicializa el componente una vez se ha conectado.
	 */
	_init() {
		//  Ajustamos el type del input
		// . . . . . . . . . . . . . . . . . . . . .

		if ( this.type !== "text" && this.type !== "number" && this.type !== "password" && this.type !== "email" && this.type !== "url" && this.type !== "date" ) {
			this.type = "text";
		}

		//  Quitamos los spinners
		// . . . . . . . . . . . . . . . . . . . . .

		if( !this.spinners && this.type === "number" ) {
			this.inputElement.setAttribute( "nospinners", "" );
		}

		//  Ponemos el autofocus
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.autofocus && !this.readonly && !this.disabled ) {
			setTimeout(() => {
				this.focus();
			},100);
		}

		//  Si hay valor
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.value ) {
			this._keyup();
		}
	}

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() {
		this.inputElement.focus();
		this.inputElement.selectionStart = this.inputElement.selectionEnd = this.inputElement.value.length;
	}

	/**
	 * @method	_set_readonly
	 * 
	 * Pone el input como solo lectura.
	 */
	_set_readonly() {
		if ( this.readonly ) {
			this.$.label.setAttribute( "readonly", "" );
		} else {
			this.$.label.removeAttribute( "readonly" );
		}
	}

	/**
	 * @method	_set_disabled
	 * 
	 * Pone el input en modo disabled.
	 */
	_set_disabled() {
		if ( this.disabled ) {
			this.$.label.setAttribute( "disabled", "" );
		} else {
			this.$.label.removeAttribute( "disabled" );
		}
	}

	/**
	 * @method	_set_datalist
	 * 
	 * Configura el datalist del input si existe.
	 */
	_set_datalist() {
		if( this.list ) {
			let dlSlot = this.shadowRoot.querySelector( "slot[name=datalist]" );
			this.datalist = dlSlot.assignedNodes()[ 0 ];
			let options = this.datalist.querySelectorAll( "option" );
			
			if( options.length > 0 || this.activelist ) {
				this.inputElement.classList.add( "datalist" );
				
				this.observDl = new MutationObserver( this._observe_datalist.bind( this ));
				this.observDl.observe( this.datalist, { childList: true } );
			} else {
				this.datalist = false;
			}
		}
	}

	/**
	 * @method	_observe_datalist
	 * 
	 * Obserca los cambios en el datalist
	 */
	_observe_datalist( ev ) {
		// Obtenemos el viejo datalist.

		var oldDatalist = ev[ 0 ].target;
		
		// Creamos el nuevo datalist

		var newDatalist = document.createElement( "DATALIST" );
		for( var i = 0; i < this.datalist.attributes.length; i++ ) {
			newDatalist.setAttribute( this.datalist.attributes[ i ].name, this.datalist.attributes[ i ].value );
		}

		newDatalist.innerHTML = this.datalist.innerHTML;
		
		// Asignamos el nuevo datalist.

		this.datalist = newDatalist;

		this.removeChild( oldDatalist );
		this.appendChild( this.datalist );

		// Volvemos a poner a la escucha el nuevo datalist.

		this.observDl.disconnect();
		this.observDl = new MutationObserver( this._observe_datalist.bind( this ));
		this.observDl.observe( this.datalist, { childList: true } );
	}

	/**
	 * @method	_register_in_form
	 * 
	 * Registra el elemento en el formulario.
	 */
	_register_in_form() {
		// Si no debe registrarse

		if( this.noregister ) {
			return false;
		}

		// Registramos el elemento

		this.dispatchEvent(new CustomEvent('aw-form-element-register', { detail: this, bubbles: true, composed: true }));
	}

	/**
	 * @method	_focusin
	 * 
	 * Acciones a realizar cuando se hace focus sobre el input.
	 */
	_focusin( ev ) {
		super._focusin();

		if( this.inputElement.value && this.selectonfocus ) {
			this.inputElement.select();
		}
		
		// Impedimos si es de solo lecutura o está desactivado.

		if( this.readonly || this.disabled ) {
			this.inputElement.blur();
			return false;
		}

		// Damos estilo de focus

		this.$.label.setAttribute( "focused", "" );
		this.$.baseline.setAttribute( "focused", "" );
		this.$.container.setAttribute( "focused", "" );

		// Invocamos la función externa focusin

		if ( typeof this.focusinfunc === "function" ) {
			this.focusinfunc( this.inputElement );
		}
	}

	/**
	 * @method	_focusout
	 * 
	 * Acciones a realizar cuando se quita el focus del input.
	 */
	_focusout( ev ) {
		super._focusout();

		// Quitamos el label focused

		this.$.label.removeAttribute( "focused" );
		this.$.baseline.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );

		// Invocamos la función externa focusout

		if ( typeof this.focusoutfunc === "function" ) {
			this.focusoutfunc( this.inputElement );
		}
	}

	/**
	 * @method	_keypress
	 * 
	 * Acciones a realizar cuando se presiona una tecla sobre el input.
	 */
	_keypress( ev ) {
		// Invocamos la función externa keypress

		if ( typeof this.keypressfunc === "function" ) {
			this.keypressfunc( this.inputElement );
		}
	}

	/**
	 * @method	_keyup
	 * 
	 * Acciones a realizar cuando se levanta una tecla sobre el input.
	 */
	_keyup( ev ) {
		super._keyup();

		if( this.inputElement.value ) {
			this.$.label.setAttribute( "writted", "" );
		} else {
			this.$.label.removeAttribute( "writted" );
		}
	
		// Invocamos la función externa keyup

		if ( typeof this.keyupfunc === "function" ) {
			this.keyupfunc( this.inputElement );
		}

		// Submitimos el formulario al pulsar intro

		if( ev && ev.keyCode === 13 && this.parentForm && !this.dlvisible ) {
			this.parentForm.submit();
		}
	}

	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando se realiza un cambio en el input.
	 */
	_change( ev ) {
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}

		// Si el input tiene el atributo "novalidate" o no tiene el validateonchange, no se valida

		if ( this.novalidate ) {
			return false;
		}

		if ( !this.validateonchange ) {
			return false;
		}

		if ( this.parentForm && this.parentForm.novalidate ) {
			return false;
		}

		// Validamos el campo

		this.__errorValidateInput( this.inputElement );
	}
}

window.customElements.define( "aw-input", AwInput );