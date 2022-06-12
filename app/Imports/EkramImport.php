<?php

namespace App\Imports;

use App\Models\Child;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class EkramImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        
/*
    "mgmoaa_dryafty" => 28858184
    "myangyn_dryafty" => 2404848.0
    "taadad_hamyan" => "5"
    "shmarh_hsab" => "0309557479"
    "tarykh_thbt_dr_akram" => "13981115"
    "akamt" => "روستايي"
    "nsb" => "عام"
    "odaayt_slamty" => "سالم"
    "trh" => "ایتام"
    "mobayl" => null
    "kd_mddgoyy" => "5791530890688850"
    "gnsyt" => "پسر"
    "sn" => "17"
    "tarykh_told" => "1383/06/12"
    "kd_mly" => "0890688850"
    "nam_khanoadgy" => "سلیمی"
    "nam" => "اباذر"
    "rdyf" => "1"
 */
        foreach ($collection as $row) {
            $child["first_name"]=$row["nam"];
            $child["last_name"]=$row["nam_khanoadgy"];
            $child["national_code"]=$row["kd_mly"];
            $child["supporters_count"]=$row["taadad_hamyan"];
            $child["support_amount_average"]=$row["myangyn_dryafty"];
            $child["type"]=$row["trh"] == "ایتام" ? 1 : 2;
            $child["sex"]=$row["gnsyt"] == "پسر";
            // $child["birth_date"]=$row["tarykh_told"];
            $child["city_id"]=1;
            $child["office_id"]=1;

            $this->store($child);
        }


        /*
                $table->string("first_name")->nullable();
                $table->string("last_name")->nullable();
                $table->string("national_code")->nullable();
                $table->string("address")->nullable();
                $table->string("mobile")->nullable();
                $table->string("phone")->nullable();
                $table->integer("sex")->nullable();
                $table->integer("type")->nullable();
                $table->integer("supporters_count")->nullable();
                $table->integer("support_amount_average")->nullable();
                $table->text("emotional_text")->nullable();
                $table->text("about")->nullable();
                $table->integer("priority")->default(20);
                $table->date("birth_date")->nullable();
                $table->boolean("published")->default(true);
                $table->unsignedInteger("city_id");
                $table->unsignedInteger("office_id"); */
    }

    private function store($childData){
        
        $child = Child::whereNationalCode($childData["national_code"])->first();
        
        if($child){
            $child->fill($childData);
            $child->save();
            return;
        }

        Child::create($childData);

    }
}
