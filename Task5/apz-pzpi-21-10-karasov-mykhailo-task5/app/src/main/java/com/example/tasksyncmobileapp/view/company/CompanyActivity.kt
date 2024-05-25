package com.example.tasksyncmobileapp.view.company

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.lifecycleScope
import com.example.tasksyncmobileapp.BuildConfig
import com.example.tasksyncmobileapp.R
import com.example.tasksyncmobileapp.controller.CompanyController
import com.example.tasksyncmobileapp.databinding.ActivityCompanyBinding
import com.example.tasksyncmobileapp.model.Company
import com.example.tasksyncmobileapp.network.RetrofitClient
import com.example.tasksyncmobileapp.repository.CompanyRepository
import com.example.tasksyncmobileapp.util.classes.FileManager
import com.example.tasksyncmobileapp.util.classes.TokenManager
import com.example.tasksyncmobileapp.view.HeaderFragment
import kotlinx.coroutines.launch

class CompanyActivity : AppCompatActivity() {
    private lateinit var binding: ActivityCompanyBinding
    private lateinit var companyController: CompanyController
    private lateinit var company: Company
    private lateinit var tokenManager: TokenManager
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCompanyBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportFragmentManager.beginTransaction()
            .replace(R.id.companyHeader, HeaderFragment())
            .commit()

        tokenManager = TokenManager(binding.root.context)
        var retrofitClient = RetrofitClient()
        var companyRepository = CompanyRepository(retrofitClient.apiService)
        companyController = CompanyController(companyRepository)

        getCompany()
    }

    private fun getCompany(){
        lifecycleScope.launch {
            val result = companyController.getCompany(tokenManager.getToken()!!)
            val fileManager = FileManager()
            result.onSuccess { company ->
                binding.apply {
                    println(company)
                    tvCompanyName.text = company.company.companyName
                    tvCompanyDescription.text = company.company.description
                    fileManager.loadImage2ImageView(
                        BuildConfig.BASE_IMAGE_URL + company.company.companyImage,
                        ivCompanyImage,
                        300,
                        300
                    )
                }
            }.onFailure {

            }
        }
    }
}