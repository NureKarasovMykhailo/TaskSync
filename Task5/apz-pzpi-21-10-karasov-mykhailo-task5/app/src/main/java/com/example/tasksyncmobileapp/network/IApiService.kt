package com.example.tasksyncmobileapp.network

import com.example.tasksyncmobileapp.model.Company
import com.example.tasksyncmobileapp.model.dto.AuthDto
import com.example.tasksyncmobileapp.model.dto.RegistrationDto
import com.example.tasksyncmobileapp.model.response.AuthRegistrationResponse
import com.example.tasksyncmobileapp.model.response.CompanyResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface IApiService {
    @POST("auth/login")
    suspend fun login(@Body authDto: AuthDto): AuthRegistrationResponse

    @POST("auth/registration")
    suspend fun registration(@Body registrationDto: RegistrationDto): AuthRegistrationResponse

    @GET("auth/check-auth")
    suspend fun checkAuth(@Header("Authorization") token: String): AuthRegistrationResponse

    @GET("public-company/")
    suspend fun getCompany(@Header("Authorization") token: String): CompanyResponse
}