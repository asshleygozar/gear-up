import React from 'react';

// Form types and attributes
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	children: React.ReactNode;
}

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

interface FormLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
	styles?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	children: React.ReactNode;
}

interface FormInput extends React.InputHTMLAttributes<HTMLInputElement> {
	styles?: string;
}

type FormError = {
	children: React.ReactNode;
	className: string;
};

// Form
export function Form({ className, children, ...props }: FormProps) {
	return (
		<form
			className={className}
			{...props}
		>
			{children}
		</form>
	);
}

// Form grouping container
export function FormGroup({ className, children, ...props }: FormGroupProps) {
	return (
		<div
			className={className}
			{...props}
		>
			{children}
		</div>
	);
}

// Form label component
export function FormLabel({ className, children, ...props }: FormLabel) {
	return (
		<label
			className={className}
			{...props}
		>
			{children}
		</label>
	);
}

export function FormInput({ className, ...props }: FormInput) {
	return (
		<input
			className={className}
			{...props}
		/>
	);
}

export function Button({
	className,
	children,
	isLoading = false,
	...props
}: ButtonProps) {
	return (
		<button
			className={className}
			{...props}
			disabled={isLoading}
		>
			{children}
		</button>
	);
}

export function FormError({ className, children }: FormError) {
	return <span className={className}>{children}</span>;
}
