import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

let firstName, lastName, email, message, submitBtn, error

beforeEach(() => {
    render (<ContactForm/>)
     firstName = screen.getByLabelText(/First Name/i)
     lastName = screen.getByLabelText(/last Name/i)
     email = screen.getByLabelText(/email/i)
     message = screen.getByLabelText(/message/i)
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
    userEvent.type(firstName, 'adekunle')
    userEvent.type(lastName, 'shennaike')
    userEvent.type(email, '')
    userEvent.click(submitBtn)

    const error = screen.getAllByTestId('error')

    expect(error).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    userEvent.type(email, 'masterfujihs')

    const error = screen.getByText(/email must be a valid email address./i)

    expect(error).toBeInTheDocument()
    expect(error).toBeVisible()
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    userEvent.type(lastName, '')
    userEvent.click(submitBtn)

    const error = screen.getByText(/lastName is a required field./i)

    expect(error).toBeInTheDocument()
    expect(error).toBeVisible()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    userEvent.type(firstName, 'adekunle')
    userEvent.type(lastName, 'shennaike')
    userEvent.type(email, 'masterfuji23@gmail.com')
    userEvent.type(message, '')
    userEvent.click(submitBtn)

    const firstnameDisplay = screen.getByTestId('firstnameDisplay')
    const lastnameDisplay = screen.getByTestId('lastnameDisplay')
    const emailDisplay = screen.getByTestId('emailDisplay')
    // const messageDisplay = screen.getByTestId('messageDisplay')

    expect(firstnameDisplay).toBeInTheDocument()
    expect(firstnameDisplay).toBeVisible()
    expect(lastnameDisplay).toBeInTheDocument()
    expect(lastnameDisplay).toBeVisible()
    expect(emailDisplay).toBeInTheDocument()
    expect(emailDisplay).toBeVisible()
    // expect(messageDisplay).not.toBeInTheDocument()
    // expect(messageDisplay).not.toBeVisible()
});

test('renders all fields text when all fields are submitted.', async () => {
    userEvent.type(firstName, 'adekunle')
    userEvent.type(lastName, 'shennaike')
    userEvent.type(email, 'masterfuji23@gmail.com')
    userEvent.type(message, 'this better work')
    userEvent.click(submitBtn)
    
    const firstnameDisplay = screen.getByTestId('firstnameDisplay')
    const lastnameDisplay = screen.getByTestId('lastnameDisplay')
    const emailDisplay = screen.getByTestId('emailDisplay')
    const messageDisplay = screen.getByTestId('messageDisplay')
    
    expect(firstnameDisplay).toBeInTheDocument()
    expect(firstnameDisplay).toBeVisible()
    expect(lastnameDisplay).toBeInTheDocument()
    expect(lastnameDisplay).toBeVisible()
    expect(emailDisplay).toBeInTheDocument()
    expect(emailDisplay).toBeVisible()
    expect(messageDisplay).toBeInTheDocument()
    expect(messageDisplay).toBeVisible()
});