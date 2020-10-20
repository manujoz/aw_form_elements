import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_form_helpers/aw-input-error.js";

class AwInputColor extends AwInputErrorMixin( AwExternsFunctionsMixin( AwFormValidateMixin( PolymerElement ))) 
{
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

				/* #region Etiqueta del input */

				#label {
					position: relative;
					color: var(--aw-input-label-color,#888888);
					font-size: var(--aw-input-label-font-size,11px);
					font-weight: var(--aw-input-label-font-weight,normal);
					margin: var(--aw-input-label-margin,0);
					padding: var(--aw-input-label-padding,0);
					text-align: var(--aw-input-label-text-align,left);
					transition: color .2s;
				}
				#label[writted] {
					color: var(--aw-input-label-color-writted,var(--aw-input-label-color,#888888));
				}
				#label[focused] {
					color: var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD));
				}
				#label[error] {
					color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
				}
				#label[disabled] {
					color: var(--aw-input-label-color-disabled,var(--aw-input-color-disabled,#BBBBBB));
				}

				/* #region Input visible */

				.container {
					position: relative;
					overflow: hidden;
					border-top: var(--aw-input-border-top,var(--aw-input-border,solid 1px #CCCCCC));
					border-right: var(--aw-input-border-right,var(--aw-input-border,solid 1px #CCCCCC));
					border-bottom: var(--aw-input-border-bottom,var(--aw-input-border,solid 1px #CCCCCC));
					border-left: var(--aw-input-border-left,var(--aw-input-border,solid 1px #CCCCCC));
					border-radius: var(--aw-input-border-radius,2px);
					box-shadow: var(--aw-input-box-shadow,none);
					transition: all .3s;
				}
				.container[focused]{
                	outline: 0;
					border-top: var(--aw-input-border-top-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-focused,var(--aw-input-background-color,transparent));
				}
				.container[error]{
					border-top: var(--aw-input-border-top-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
				}
				.container[disabled]{
					color: var(--aw-input-color-disabled, #BBBBBB);
					border: var(--aw-input-border-disabled,solid 1px #DDDDDD);
					background-color: var(--aw-input-background-color-disabled,#F9F9F9);
				}
				.container input {
					width: 100%;
					margin: 0;
					border: none;
					color: var(--aw-input-color,#333333);
					padding: var(--aw-input-padding,7px);
                	font-family: var(--aw-input-font-family, "arial");
                	font-size: var(--aw-input-font-size, 16px);
					font-weight: var(--aw-input-font-weight,normal);
					font-style: var(--aw-input-font-style,normal);
					text-align: var(--aw-input-text-align, left);
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
					transition: all .2s;
					opacity: 0;
				}
				.container input[type=color] {
					position: absolute;
					top: 0%;
					left: 0%;
					width: 100%;
					height: 100%;
					padding: 0;
					margin: 0;
					border: none;
					opacity: 0;
					cursor: pointer;
				}

				/* #region Flexible de error y contador */

				.flex_inf {
					position: relative;
					display: flex;
					flex: row wrap;
				}

				.flex_inf > .left {
					position: relative;
					flex-grow: 1;
					flex-basis: auto;
				}
			</style>
			<div id="label" hidden="{{!label}}">{{label}}</div>
			<div id="container" class="container">
				<label><input
					type="text"
					id$="[[id]]"
					name$="[[name]]"
					value$="{{value}}"
					readonly$="[[readonly]]"
					disabled$="[[disabled]]"

					required$="[[required]]"
					novalidate$=[[novalidate]]

					error$=[[error]]
					errmsg$="{{errmsg}}"
					/></label>
				<input type="color" on-change="_change" on-focusin="_focusin" on-focusout="_focusout">
			</div>
			<div class="flex_inf">
				<div class="left">
					<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>
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
			value: { type: String, observer: "_change_value" },
			readonly: {type: Boolean, value: false, observer: "_set_readonly"},
            disabled: {type: Boolean, value: false, observer: "_set_disabled"},

			// Atributos de diseño

			label: { type: String },

			// Atrtibutos de validación

			required: { type: Boolean, value: false },
			novalidate: { type: Boolean, value: false },
			validateonchange: { type: Boolean, value: false },

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
	connectedCallback()
	{
		super.connectedCallback();

		// Asignamos el input

		this.inputElement = this.shadowRoot.querySelector( "input[type=text]" );
		this.inputColor = this.shadowRoot.querySelector( "input[type=color]")

		// Inicializamos el componente

		this._init();

		// Activamos los errores

		this.error_listen();

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
	disconnectedCallback()
	{
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.inputElement );
		}
	}

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide()
	{
		this.inputElement.setAttribute( "errmsg", "" );
	}

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message )
	{
		this.inputElement.setAttribute( "errmsg", message );
	}

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value()
	{
		return this.inputElement.value;
	}

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error()
	{
		if( this.inputElement.getAttribute( "errmsg" )) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando el valor cambia
	 * 
	 * @param {any} ev Evento lanzado por le input
	 */
	_change( ev )
	{
		this.shadowRoot.querySelector( ".container" ).style.backgroundColor = this.inputColor.value;
		this.inputElement.value = this.inputColor.value;

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

	/**
	 * @method	_change_value
	 * 
	 * Observa el cambio del value
	 */
	_change_value()
	{
		if( this.inputColor.value !== this.value ) {
			this.inputColor.value = this.value;
			this._change();
		}
	}

	/**
	 * @method	_focusin
	 * 
	 * Acciones a realizar cuando se hace focus sobre el input.
	 * 
	 * @param {any} ev Evento lanzado por le input
	 */
	_focusin( ev )
	{
		// Impedimos si es de solo lecutura o está desactivado.

		if( this.readonly || this.disabled ) {
			this.inputElement.blur();
			return false;
		}

		// Damos estilo de focus

		this.$.label.setAttribute( "focused", "" );
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
	 * 
	 * @param {any} ev Evento lanzado por le input
	 */
	_focusout( ev )
	{
		// Quitamos el label focused

		this.$.label.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );

		// Invocamos la función externa focusout

		if ( typeof this.focusoutfunc === "function" ) {
			this.focusoutfunc( this.inputElement );
		}
	}

	/**
	 * @method	_init
	 * 
	 * Inicializa el componente una vez se ha conectado.
	 */
	_init()
	{
		if( !this.value ) {
			this.value = "#EAEAEA";
		}

		this.inputColor.value = this.value;		
		this.shadowRoot.querySelector( ".container" ).style.backgroundColor = this.inputColor.value;
		this.inputElement.value = this.inputColor.value;
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

	_set_disabled()
	{
		// TODO: Hacer este método
	}

	_set_readonly()
	{
		// TODO: Hacer este método
	}
}

window.customElements.define( "aw-input-color", AwInputColor );

