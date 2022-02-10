import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

let firstName, lastName, email, message, submitBtn, error

beforeEach(() => {
    render (<ContactForm/>)
     firstName = screen.getByLabelText('First Name', {exact: false})
     lastName = screen.getByLabelText('last Name', {exact: false})
     email = screen.getByLabelText('email', {exact: false})
     message = screen.getByLabelText('message', {exact: false})
     submitBtn = screen.getByRole('button')

    //  error = screen.getAllByText(/error/i)
});

afterEach(() => {
    document.body.innerHTML = ''
});

test('renders without errors', ()=>{
    render (<ContactForm/>)
});

test('renders the contact form header', ()=> {
    const header = screen.getByText('Contact Form')

    expect(header).toBeTruthy()
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    userEvent.type(firstName, 'ade')

    const error = screen.getAllByTestId("error")

    expect(error).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    userEvent.type(firstName, "")
    userEvent.type(lastName, "")
    userEvent.type(email, "")
    userEvent.click(submitBtn)

    const error = screen.getAllByTestId("error")

    expect(error).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});